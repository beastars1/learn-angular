import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, } from "rxjs";
import { Resource } from "./resource.model";
import { catchError } from "rxjs/operators";

@Injectable({
  // 将下面的类注入到根模块中
  providedIn: 'root'
})
export class ResourceService {
  constructor(private http: HttpClient) {

  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>("/api/resources");
  }

  /**
   * 添加对象
   * @param body 要添加的对象
   * @returns 返回添加是成功还是失败
   */
  createResource(body: Resource): Observable<Resource> {
    return this.http.post<Resource>(`/api/resources`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * 更新指定编号的对象
   * @param id 要更新的对象的编号
   * @param body 更新后的对象
   * @returns 返回更新是成功还是失败
   */
  updateResource(id: string, body: Resource): Observable<Resource> {
    return this.http.patch<Resource>(`/api/resources/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  deleteResource(id: string): Observable<Resource> {
    return this.http.delete<Resource>(`/api/resources/${id}`);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let message;

    if (errorResponse.error instanceof ErrorEvent) {
      message = errorResponse.error.message;
    } else {
      message = errorResponse.error;
    }

    return throwError(message);
  }
}