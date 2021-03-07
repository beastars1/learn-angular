// 关闭开发者模式
import { enableProdMode } from "@angular/core";

// 告诉 angular 使用哪个模块来启动整个应用
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// 整个应用的主模块
import { AppModule } from "./app/app.module";

import { environment } from "./environments/environment";

if (environment.production) {
  // 关闭开发者模式
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(
  e => console.log(e)
)