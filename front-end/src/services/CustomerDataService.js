// CustomerDataService.js
// 목적 : Customer 정보를 axios 로 CRUD 를 하는 공통 함수들 정의
import http from "../http-common";

class CustomerDataService {
    // 모든 고개정보 조회 요청 함수
    // email : 고개명
    // page  : 현재페이지 번호
    // size  : 페이지당 화면에 보여질 개수
    getAll(email, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/customer")
        // 1) 전체 조회 +
        // 2) 고개명 조회 같이 하는 함수
        return http.get(`/customer?email=${email}&page=${page}&size=${size}`); 
    }

    // 고객번호로 조회 요청 함수
    // get 방식 통신 요청 -> @GetMapping("/api/customer/{cid}"), @PathVariable
    get(cid) {
        return http.get(`/customer/${cid}`)
    }

    // 고객정보 생성(insert) 요청 함수
    // post 방식 통신 요청 -> @PostMapping("/api/customer"), @RequestBody
    create(data) {
        console.log(data);
        return http.post("/customer", data);
    }

    // 고객정보 수정(update) 요청 함수
    // put 방식 통신 요청 -> @PutMapping("/api/customer/{cid}"), @RequestBody
    update(cid, data) {
        return http.put(`/customer/${cid}`, data);
    }

    // 고객정보 삭제(delete) 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/customer/deletion/{cid}")
    //                        , @PathVariable  
    delete(cid) {
        return http.delete(`/customer/deletion/${cid}`);
    }

    // 고객정보 전체 삭제 요청 함수
    // delete 방식 통신 요청 -> @DeleteMapping("/api/customer/all")
    deleteAll() {
        return http.delete("/customer/all")
    }

}

export default new CustomerDataService();