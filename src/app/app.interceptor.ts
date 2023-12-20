import { HttpInterceptorFn } from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Token ${localStorage.getItem('token')}`)
  })
  if (localStorage.getItem('token')) {
    return next(authReq)
  } else {
    return next(req)
  }
};
