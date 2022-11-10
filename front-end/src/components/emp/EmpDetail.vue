<template>
  <!-- EmpDetail.vue -->
  <div>
    <!-- 수정 양식 폼 시작 -->
    <div v-if="currentEmp" class="edit-form">
      <h4>Emp</h4>
      <form>
        <!-- 사원명 -->
        <div class="form-group">
          <label for="ename">Ename</label>
          <input
            type="text"
            class="form-control"
            id="ename"
            v-model="currentEmp.ename"
          />
        </div>

        <!-- 직위 -->
        <div class="mt-3 form-group">
          <label for="job">Job</label>
          <input
            type="text"
            class="form-control"
            id="job"
            v-model="currentEmp.job"
          />
        </div>   

        <!-- manager -->
        <div class="mt-3 form-group">
          <label for="manager">manager</label>
          <input
            type="text"
            class="form-control"
            id="manager"
            v-model="currentEmp.manager"
          />
        </div>        
        <!-- 입사일 -->
        <div class="mt-3 form-group">
          <label for="hiredate">hiredate</label>
          <input
            type="text"
            class="form-control"
            id="hiredate"
            v-model="currentEmp.hiredate"
          />
        </div>        
        <!-- 월급여 -->
        <div class="mt-3 form-group">
          <label for="salary">salary</label>
          <input
            type="text"
            class="form-control"
            id="salary"
            v-model="currentEmp.salary"
          />
        </div>        
        <!-- 인센티브 -->
        <div class="mt-3 form-group">
          <label for="commission">commission</label>
          <input
            type="text"
            class="form-control"
            id="commission"
            v-model="currentEmp.commission"
          />
        </div>        
        <!-- 부서번호 -->
        <div class="mt-3 form-group">
          <label for="dno">dno</label>
          <input
            type="text"
            class="form-control"
            id="dno"
            v-model="currentEmp.dno"
          />
        </div>
      </form>

      <button class="mt-3 btn btn-danger" @click="deleteEmp">Delete</button>

      <button
        type="submit"
        class="ms-3 mt-3 btn btn-success"
        @click="updateEmp"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
    <!-- 수정 양식 폼 끝 -->

    <div v-else>
      <br />
      <p>Please click on a Emp…</p>
    </div>
  </div>
</template>

<script>
import EmpDataService from '@/services/EmpDataService';
export default {
  data() {
    return {
      currentEmp: null,
      message: ""
    };
  },
  methods: {
    // 부서번호(eno)로 조회 요청하는 함수
    getEmp(eno) {
      // axios 공통함수 호출
      EmpDataService.get(eno)
      // 성공하면 .then() 결과가 리턴됨
      .then(response => {
        // springboot 결과를 리턴함(부서 객체)
        this.currentEmp = response.data;
        // 콘솔 로그 출력
        console.log(response.data);
      })
      // 실패하면 .catch() 에러메세지가 리턴됨
      .catch(e => {
        console.log(e);
      });
    },
    // 부서정보를 수정 요청하는 함수
    updateEmp() {
      // axios 공통함수 호출
      EmpDataService.update(this.currentEmp.eno, this.currentEmp)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        this.message = "The Emp was updated successfully!";
      })
      // 실패하면 .catch() 에러메세지가 전송됨
      .catch(e => {
        console.log(e);
      });
    },
    // 부서정보를 삭제 요청하는 함수
    deleteEmp() {
      // axios 공통함수 호출
      EmpDataService.delete(this.currentEmp.eno)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        // 첫페이지(전체목록_조회_페이지) 강제 이동 : /emp 
        this.$router.push("/emp");
      })
      // 실패하면 .catch() 에러메세지가 전송됨
      .catch(e => {
        console.log(e);
      });
    }
  },
  // 화면이 뜨자 마자 실행되는 이벤트
  mounted() {
    // 클라이언트쪽 디버깅
    // alert(this.$route.params.eno);
    // console.log(this.$route.params.eno);
    
    this.message = "";
  //  this.$route.params.eno : 이전페이지에서 전송한 매개변수는 $route.params 안에 있음
  // $route 객체 : 주로 url 매개변수 정보들이 있음
  // router/index.js 상세페이지 url의 매개변수명 : :eno 
    this.getEmp(this.$route.params.eno);
  },
};
</script>

<style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
</style>
