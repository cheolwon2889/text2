// EmpDataService.js
// 목적 : Emp 정보를 axios 로 CRUD 를 하는 공통 함수들 정의
import http from "../http-common";

class EmpDataService {
    // 모든 부서정보 조회 요청 함수
    getAll(ename, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/emp")
        return http.get(`/emp?ename=${ename}&page=${page}&size=${size}`); 
    }

    // 부서번호로 조회 요청 함수
    // get 방식 통신 요청 -> @GetMapping("/api/emp/{eno}"), @PathVariable
    get(eno) {
        return http.get(`/emp/${eno}`)
    }

    // 부서정보 생성(insert) 요청 함수
    // post 방식 통신 요청 -> @PostMapping("/api/emp"), @RequestBody
    create(data) {
        return http.post("/emp", data);
    }

    // 부서정보 수정(update) 요청 함수
    // put 방식 통신 요청 -> @PutMapping("/api/emp/{eno}"), @RequestBody
    update(eno, data) {
        return http.put(`/emp/${eno}`, data);
    }

    // 부서정보 삭제(delete) 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/emp/deletion/{eno}")
    //                        , @PathVariable  
    delete(eno) {
        return http.delete(`/emp/deletion/${eno}`);
    }

    // 부서정보 전체 삭제 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/emp/all")
    deleteAll() {
        return http.delete("/emp/all")
    }

    // 부서명 검색 요청 함수
    // 쿼리스트링 방식 url : ?변수명=값&변수명2=값2....
    // get 방식 통신 요청 -> @GetMapping("/api/emp") , @RequestParam
    // findByEname(ename) {
        
    //     return http.get(`/emp?ename=${ename}`);
    // }

}

export default new EmpDataService();