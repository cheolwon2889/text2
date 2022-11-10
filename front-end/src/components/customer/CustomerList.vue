<template>
  <div>
    <!-- search 관련 div 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!--            Todo : 수정 시작 -->
        <input
          type="text"
          class="form-control"
          placeholder="Search by Email"
          v-model="searchEmail"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="
              page = 1;
              retrieveCustomer();
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
            <!--            size : 3, 6, 9 -->
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

    <!-- 테이블 목록 시작 -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <!-- <!— <th scope="col">Last Name</th> —> -->
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="(data, index) in customer" :key="index">
        <tr>
          <td>{{ data.lastName + " " + data.firstName }}</td>
          <!-- <!— <td>{{ data.lastName }}</td> —> -->
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>
            <router-link :to="'/customer/' + data.cid"
              ><span class="badge bg-success">Edit</span></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 테이블 목록 끝 -->
  </div>
</template>


<script>
// axios 공통 함수 ( springboot 연동을 위한 함수들의 모임 )
import CustomerDataService from "../../services/CustomerDataService"

export default {
  data() {
    return {
      customer: [],
      searchEmail: "", // 이메일 검색

      // 페이징을 위한 변수 정의
      page: 1,     // 현재 페이지
      count: 0,    // 전체 데이터 건수
      pageSize: 3, // 한페이지당 몇개를 화면에 보여줄지 결정하는 변수

      pageSizes: [3,6,9] // select box 에 넣을 기본 데이터
    }
  },
  methods: {
    // 함수명   : retrieveCustomer()
    // 매개변수 : this.searchEmail (email 검색어)
    //            this.page (현재 페이지 번호)
    //            this.pageSize (페이지 당 개수)
    // 리턴값 : 없음
    retrieveCustomer() {
      CustomerDataService.getAll(this.searchEmail, this.page - 1, this.pageSize)
      .then((response) => {
        // 모던 자바 문법 : 구조 분해 할당
        // const(let) {속성, 속성2} = 객체
        const { customer, totalItems } = response.data
        this.customer = customer;
        this.count = totalItems;
      })
      .catch((e) => {
        console.log(e);
      })
    },
    // select box 값 변경시 실행되는 함수(재조회)
    handlePageSizeChange(event) {
      this.pageSize = event.target.value; // 한페이지당 개수 저장(3, 6, 9)
      this.page =1;
      // 재조회 함수 호출
      this.retrieveCustomer();
    },
    // 페이지 번호 변경시 실행되는 함수(재조회)
    handlePageChange(value) {
      this.page = value; // 매개변수값으로 현재페이지 변경
      // 재조회 함수 호출
      this.retrieveCustomer();
    },
  },
  // 화면이 뜨자마자 실행되는 이벤트
  mounted() {
    this.retrieveCustomer();
  },

}
</script>

<style>

</style>