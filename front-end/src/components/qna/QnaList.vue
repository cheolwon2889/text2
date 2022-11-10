<template>
  <div>
    <!-- search 관련 div 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- select box 추가 : v-model="searchSelect" -->
        <div class="col-2">
          <select class="form-select" v-model="searchSelect">
            <option>question</option>
            <option>questioner</option>
          </select>
        </div>

        <!-- searchDname -> searchKeyword 변경 -->
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            placeholder="Search by Question"
            v-model="searchKeyword"
          />
        </div>

        <div class="input-group-append col-1">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="
              page = 1;
              retrieveQna();
            "
          >
            Search
          </button>
        </div>
        <!--            Todo : 수정 끝 -->
      </div>
    </div>
    <!-- search 관련 div 끝 -->

    <!--    Todo : page 바 시작 -->
    <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            <!-- <!—            size : 3, 6, 9 —> -->
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <!-- <!—    Todo : page 바 끝 —> -->

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Question</th>
          <th scope="col">Questioner</th>
          <th scope="col">Answer</th>
          <th scope="col">Answerer</th>
        </tr>
      </thead>
      <tbody v-for="(data, index) in qna" :key="index">
        <tr>
          <td>{{ data.question }}</td>
          <td>{{ data.questioner }}</td>
          <td>{{ data.answer }}</td>
          <td>{{ data.answerer }}</td>
          <td>
            <router-link :to="'/qna/' + data.qno"
              ><span class="badge bg-success">Edit</span></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// axios 공통함수
import QnaDataService from "../../services/QnaDataService";

export default {
  data() {
    return {
      qna: [],
      searchKeyword: "",
      searchSelect: "question",

      // 페이징을 위한 변수 정의
      page: 1, // 현재 페이지
      count: 0, // 전체 데이터 건수
      pageSize: 3, // 한페이지당 몇개를 화면에 보여줄지 결정하는 변수

      pageSizes: [3, 6, 9], // select box 에 넣을 기본 데이터
    };
  },
  methods: {
    // axios , 모든 정보 조회 요청 함수
    retrieveQna() {
      QnaDataService.getAll(
        this.searchSelect, // select box 선택된 값
        this.searchKeyword, // 검색어
        this.page - 1,
        this.pageSize
      )
        // 성공하면 .then() 결과가 전송됨
        .then((response) => {
          const { qna, totalItems } = response.data; // springboot 의 전송된 맵 정보
          this.qna = qna; // 스프링부트에서 전송한 데이터
          this.count = totalItems; // 스프링부트에서 전송한 페이지정보(총 건수)
          // 디버깅 콘솔에 정보 출력
          console.log(response.data);
        })
        // 실패하면 .catch() 에 에러가 전송됨
        .catch((e) => {
          console.log(e);
        });
    },
    // select box 값 변경시 실행되는 함수(재조회)
    handlePageSizeChange(event) {
      this.pageSize = event.target.value; // 한페이지당 개수 저장(3, 6, 9)
      this.page = 1;
      // 재조회 함수 호출
      this.retrieveQna();
    },
    // 페이지 번호 변경시 실행되는 함수(재조회)
    handlePageChange(value) {
      this.page = value; // 매개변수값으로 현재페이지 변경
      // 재조회 함수 호출
      this.retrieveQna();
    },
  },
  // 화면이 뜨자마자 실행되는 이벤트(라이프 사이클 함수) : mounted(), created()
  mounted() {
    this.retrieveQna(); // 화면 로딩시 전체 조회함수 실행
  },
};
</script>

<style></style>
