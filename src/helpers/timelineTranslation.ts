import { Action } from 'src/entities/action.entity';
import { MatchPattern } from '../constants';

export function toSelenium(timelineData): string[] {
  const code = [];

  const seleniumByMethod = {
    [MatchPattern.CSS]: 'cssSelector',
    [MatchPattern.ID]: 'id',
    [MatchPattern.XPATH]: 'xpath',
  };

  timelineData.forEach((item) => {
    switch (item.category) {
      case 'open_url':
        code.push(`driver.get("${item.data.url}");`);
        break;
      case 'click':
        code.push(
          `driver.findElement(By.${seleniumByMethod[item.data.by]}("${
            item.data.element
          }")).click();`,
        );
        break;
      case 'type':
        code.push(
          `driver.findElement(By.${seleniumByMethod[item.data.by]}("${
            item.data.element
          }")).sendKeys("${item.data.text}");`,
        );
        break;
      default:
        code.push(`// TODO: create an instruction for '${item.category}'`);
        break;
    }
  });

  return code;
}

const code = [];
export function toTagUI(timelineData): string[] {
  timelineData.forEach((item) => {
    switch (item.category) {
      case 'open_url':
        code.push(`${item.data.url}`);
        break;
      case 'click':
        code.push(`click ${item.data.element}`);
        break;
      case 'type':
        code.push(`type ${item.data.element} as ${item.data.text}`);
        break;
      default:
        code.push(`// TODO: create an instruction for '${item.category}'`);
        break;
    }
  });

  return code;
}

export function toAutoHealingJavaFile(
  timelineData: Action[],
  className: string,
  methodName: string,
): string[] {
  const javaFile = [
    '// Generated by SRT plugin',
    'package com.atlantico.srt.tests;',
    'import org.junit.jupiter.api.Test;',
    'import org.junit.jupiter.api.BeforeAll;',
    'import org.junit.jupiter.api.AfterAll;',
    'import org.junit.jupiter.api.TestInstance;',
    'import org.junit.runner.RunWith;',
    'import org.junit.runners.BlockJUnit4ClassRunner;',
    'import org.openqa.selenium.*;',
    'import com.epam.healenium.SelfHealingDriver;',
    'import java.util.concurrent.TimeUnit;',
    'import io.github.bonigarcia.wdm.WebDriverManager;',
    'import org.openqa.selenium.Dimension;',
    'import org.openqa.selenium.JavascriptExecutor;',
    'import org.openqa.selenium.WebDriver;',
    'import org.openqa.selenium.chrome.ChromeDriver;',
    'import org.openqa.selenium.chrome.ChromeOptions;',
    '',
    '@TestInstance(TestInstance.Lifecycle.PER_CLASS)',
    '',
    `public class ${className} {`,
    ' public SelfHealingDriver driver;',
    ' protected JavascriptExecutor js;',
    '',
    ' @BeforeAll',
    ' public void setUp() {',
    '   WebDriverManager.chromedriver().setup();',
    '   ChromeOptions options = new ChromeOptions();',
    '   options.addArguments("--headless");',
    '   options.addArguments("--no-sandbox");',
    '   options.addArguments("--disable-dev-shm-usage");',
    '',
    '   WebDriver delegate = new ChromeDriver(options);',
    '   this.driver = SelfHealingDriver.create(delegate);',
    '   this.driver.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);',
    '   this.driver.manage().window().setSize(new Dimension(1200, 800));',
    '   js = (JavascriptExecutor) this.driver;',
    ' }',
    '',
    ' @Test',
    ` public void ${methodName}() {`,
  ];
  javaFile.push(...toSelenium(timelineData).map((row) => `  ${row}`));
  javaFile.push(
    ' @AfterAll',
    ' public void after() {',
    '   if (this.driver != null) {',
    '     this.driver.quit();',
    '   }',
    ' }',
    '}',
  );

  return javaFile;
}
