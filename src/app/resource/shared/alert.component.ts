import { ResourceAlert } from "./resource.model";

export class AlertComponent {
  public alert!: ResourceAlert;
  public timeoutId: any | undefined;

  /**
   * @param type 更新是否成功
   * @param message 显示信息
   */
  public setAlert(type: keyof ResourceAlert, message: string) {
    this.alert = new ResourceAlert();
    this.alert[type] = message;
    // 显示更新是否成功之后，三秒之后提示清空
    this.timeoutId = setTimeout(() => {
      this.alert = new ResourceAlert();
    }, 3000);
  }

  public clearAlertTime(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.alert = new ResourceAlert();
    }
  }
}