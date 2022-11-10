// FaqDataService.js
// 목적 : Faq 정보를 axios 로 CRUD 를 하는 공통 함수들 정의
import http from "../http-common";

class FaqDataService {
    // 모든 부서정보 조회 요청 함수
    getAll(title, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/faq")
        return http.get(`/faq?title=${title}&page=${page}&size=${size}`); 
    }

    // 부서번호로 조회 요청 함수
    // get 방식 통신 요청 -> @GetMapping("/api/faq/{no}"), @PathVariable
    get(no) {
        return http.get(`/faq/${no}`)
    }

    // 부서정보 생성(insert) 요청 함수
    // post 방식 통신 요청 -> @PostMapping("/api/faq"), @RequestBody
    create(data) {
        alert("fdsafds");
        console.log(data);
        return http.post("/faq", data);
    }

    // 부서정보 수정(update) 요청 함수
    // put 방식 통신 요청 -> @PutMapping("/api/faq/{no}"), @RequestBody
    update(no, data) {
        return http.put(`/faq/${no}`, data);
    }

    // 부서정보 삭제(delete) 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/faq/deletion/{no}")
    //                        , @PathVariable  
    delete(no) {
        return http.delete(`/faq/deletion/${no}`);
    }

    // 부서정보 전체 삭제 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/faq/all")
    deleteAll() {
        return http.delete("/faq/all")
    }

    // 부서명 검색 요청 함수
    // 쿼리스트링 방식 url : ?변수명=값&변수명2=값2....
    // get 방식 통신 요청 -> @GetMapping("/api/faq") , @RequestParam
    // findByTitle(title) {
    //     return http.get(`/faq?title=${title}`);
    // }

}

export default new FaqDataService();