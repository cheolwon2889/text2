// FileDbDataService.js
// 목적 : Qna 정보를 axios 로 CRUD 를 하는 공통 함수들 정의
import http from "../http-common";

class FileDbDataService {

    // 함수 : upload() 함수 ( DB 저장 함수 )
    // 매개변수  title : 제목
    //          content : 내용
    //          fileDb : 업로드 대상 이미지
    upload(title,content,fileDb) {
        // json 객체 사용하지 않음 (x)
        // form 태그로 전송하는 방식을 이용함
        // html에선 <form></form> == js에선 FormData 객체로 사용가능
        //                        .append("속성명", 값) 함수 : 데이터를 저장
        // axios 함수 : .post()
        // 헤더 : "Content-Type" : "multipart/form-data"
        let formData = new FormData(); // 폼(form) 객체 생성

        formData.append("fileTitle", title);
        formData.append("content", content);
        formData.append("fileDb", fileDb);

        return http.post("/fileDb/upload", formData ,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
    }

    // 이미지 제목 검색 요청 함수
    getFiles(fileTitle,page,size) {
        console.log(fileTitle);
        console.log(page);
        console.log(size);
        return http.get(`/fileDb?fileTitle=${fileTitle}&page=${page}&size=${size}`);
    }

    // 이미지 삭제 요청 함수
    delete(fid) {
        return http.delete(`/fileDb/deletion/${fid}`);
    }

}

export default new FileDbDataService();
