<template>
  <div v-if="currentCustomer">
    <div class="mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input
        type="text"
        class="form-control"
        id="firstName"
        required
        name="firstName"
        v-model="currentCustomer.firstName"
      />
    </div>
    <div class="mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="lastName"
        required
        name="lastName"
        v-model="currentCustomer.lastName"
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        required
        name="email"
        v-model="currentCustomer.email"
      />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Phone</label>
      <input
        type="text"
        class="form-control"
        id="phone"
        required
        name="phone"
        v-model="currentCustomer.phone"
      />
    </div>
    <div class="mb-3">
      <button @click="updateCustomer" class="btn btn-primary me-3">
        Update
      </button>
      <button @click="deleteCustomer" class="btn btn-danger">Delete</button>
    </div>
    <div class="alert alert-success" role="alert" v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
// axios 공통 함수 ( springboot 연동을 위한 함수들의 모임 )
import CustomerDataService from "../../services/CustomerDataService";

export default {
  data() {
    return {
      currentCustomer: null,
      message: "",
    };
  },
  methods: {
    // 고객번호(cid)로 조회 요청하는 함수
    getCustomer(cid) {
      // axios 공통함수 호출
      CustomerDataService.get(cid)
      // 성공하면 .then() 결과가 리턴됨
      .then(response => {
        // springboot 결과를 리턴함(부서 객체)
        this.currentCustomer = response.data;
        // 콘솔 로그 출력
        console.log(response.data);
      })
      // 실패하면 .catch() 에러메세지가 리턴됨
      .catch(e => {
        console.log(e);
      });
    },
    updateCustomer() {
      // axios 공통함수 호출
      CustomerDataService.update(this.currentCustomer.cid, this.currentCustomer)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        this.message = "The Customer was updated successfully!";
      })
      // 실패하면 .catch() 에러메세지가 전송됨
      .catch(e => {
        console.log(e);
      });
    },
    deleteCustomer() {
      // axios 공통함수 호출
      CustomerDataService.delete(this.currentCustomer.cid)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        // 첫페이지(전체목록_조회_페이지) 강제 이동 : /dept 
        this.$router.push("/customer");
      })
      // 실패하면 .catch() 에러메세지가 전송됨
      .catch(e => {
        console.log(e);
      });
    }
  },
  // 화면 뜨자마자 실행되는 이벤트
  mounted() {
    this.message = '';
    this.getCustomer(this.$route.params.cid);
  },
};
</script>

<style></style>
