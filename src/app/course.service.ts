import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Course } from './course';

@Injectable()
export class CourseService {
  // URL for CRUD operations
  courseUrl = 'http://localhost:3000/courses';
  // Create constructor to get Http instance
  constructor(private http: Http) {
  }
// Fetch all courses
    getAllCourses(): Observable<Course[]> {
      console.log('Fetch all courses....');
          return this.http.get(this.courseUrl)
          .map(this.extractData)
          .catch(this.handleError);
    }
// Create course
    createCourse(course: Course): Observable<number> {
      // console.log('Create Course...........');
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.courseUrl, course, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
// Fetch course by id
    getCourseById(courseId: string): Observable<Course> {
  const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: cpHeaders });
  console.log(this.courseUrl + '/' + courseId);
  return this.http.get(this.courseUrl + '/' + courseId)
     .map(this.extractData)
     .catch(this.handleError);
    }
//  Update course
    updateCourse(course: Course): Observable<number> {
      const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.courseUrl + '/' + course.id, course, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
// Delete course
    deleteCourseById(courseId: string): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const course = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.courseUrl + '/' + courseId)
         .map(success => success.status)
         .catch(this.handleError);
    }
  private extractData(res: Response) {
      const body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
    }
}
