<template>
  <!-- DeptDetail.vue -->
  <div>
    <!-- 수정 양식 폼 시작 -->
    <div v-if="currentDept" class="edit-form">
      <h4>Dept</h4>
      <form>
        <div class="form-group">
          <label for="dname">Dname</label>
          <input
            type="text"
            class="form-control"
            id="dname"
            v-model="currentDept.dname"
          />
        </div>
        <div class="mt-3 form-group">
          <label for="loc">Loc</label>
          <input
            type="text"
            class="form-control"
            id="loc"
            v-model="currentDept.loc"
          />
        </div>
      </form>

      <button class="mt-3 btn btn-danger" @click="deleteDept">Delete</button>

      <button
        type="submit"
        class="ms-3 mt-3 btn btn-success"
        @click="updateDept"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
    <!-- 수정 양식 폼 끝 -->

    <div v-else>
      <br />
      <p>Please click on a Dept…</p>
    </div>
  </div>
</template>

<script>
import DeptDataService from '@/services/DeptDataService';
export default {
  data() {
    return {
      currentDept: null,
      message: ""
    };
  },
  methods: {
    // 부서번호(dno)로 조회 요청하는 함수
    getDept(dno) {
      // axios 공통함수 호출
      DeptDataService.get(dno)
      // 성공하면 .then() 결과가 리턴됨
      .then(response => {
        // springboot 결과를 리턴함(부서 객체)
        this.currentDept = response.data;
        // 콘솔 로그 출력
        console.log(response.data);
      })
      // 실패하면 .catch() 에러메세지가 리턴됨
      .catch(e => {
        console.log(e);
      });
    },
    // 부서정보를 수정 요청하는 함수
    updateDept() {
      // axios 공통함수 호출
      DeptDataService.update(this.currentDept.dno, this.currentDept)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        this.message = "The Dept was updated successfully!";
      })
      // 실패하면 .catch() 에러메세지가 전송됨
      .catch(e => {
        console.log(e);
      });
    },
    // 부서정보를 삭제 요청하는 함수
    deleteDept() {
      // axios 공통함수 호출
      DeptDataService.delete(this.currentDept.dno)
      // 성공하면 then() 결과가 전송됨
      .then(response => {
        console.log(response.data);
        // 첫페이지(전체목록_조회_페이지) 강제 이동 : /dept 
        this.$router.push("/dept");
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
    // alert(this.$route.params.dno);
    // console.log(this.$route.params.dno);
    
    this.message = "";
  //  this.$route.params.dno : 이전페이지에서 전송한 매개변수는 $route.params 안에 있음
  // $route 객체 : 주로 url 매개변수 정보들이 있음
  // router/index.js 상세페이지 url의 매개변수명 : :dno 
    this.getDept(this.$route.params.dno);
  },
};
</script>

<style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
</style>
