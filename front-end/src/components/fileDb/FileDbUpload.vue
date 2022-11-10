<template>
  <div>
    <!-- FileDbUpload.vue -->
    <!-- 검색어 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- 검색어 입력 -->
        <input
          type="text"
          class="form-control"
          placeholder="Search by Title"
          v-model="searchTitle"
        />
        <!-- 검색어 버튼 -->
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="
              page = 1;
              retrieveFileDb();
            "
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝 -->

    <!-- Upload 시작 -->
    <div class="row justify-content-md-center">
      <div class="col-12">
        <!-- 페이징 양식 시작 -->
        <div class="col-md-12">
          <!-- 셀렉트 박스 : 기본 페이지 변경 -->
          <!-- change :  handlePageSizeChange($event), 1페이지당 개수 변경 시 실행되는 이벤트-->
          <!--           $event : html 태그의 기본 이벤트, 이 객체로 현재 선택 또는 클릭한 html태그(양식)를 알 수 있음.
                     event.target (현재 사용자가 선택한 양식(여기서는 셀렉트 박스내 목록을 의미 ) -->
          <div class="mb-3">
            Items per Page:
            <select v-model="pageSize" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>

          <!-- b-pagination : 부트스트랩 - 페이지 번호 컨트롤 -->
          <!-- total-rows : 전체 데이터 개수 -->
          <!-- per-page : 1페이지 당 개수 -->
          <!-- change : handlePageChange(), 페이지 번호 변경 시 실행되는 이벤트 -->
          <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="pageSize"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
          ></b-pagination>
        </div>
        <!-- 페이징 양식 끝 -->

        <!-- 이미지명(fileTitle) 입력 박스 시작 -->
        <div class="mb-3 col-md-5">
          <label for="fileTitle" class="form-label">이미지명</label>
          <input
            type="text"
            class="form-control"
            id="fileTitle"
            required
            name="fileTitle"
            v-model="fileTitle"
          />
        </div>
        <!-- 이미지명 입력 박스 끝 -->

        <!-- 이미지 내용 입력 박스 시작 -->
        <div class="mb-3 col-md-5">
          <label for="fileContent" class="form-label">내용</label>
          <input
            type="text"
            class="form-control"
            id="fileContent"
            required
            name="fileContent"
            v-model="fileContent"
          />
        </div>
        <!-- 이미지 내용 입력 박스 끝 -->

        <!-- 이미지 선택상자 시작 -->
        <div class="mb-3 col-md-5">
          <label class="btn btn-default p-0">
            <!-- 파일 선택상자 -->
            <input
              type="file"
              accept="image/*"
              ref="file"
              @change="selectImage"
            />
          </label>
        </div>
        <!-- 이미지 선택상자 끝 -->

        <!-- Upload 버튼 : insert 문 시작 -->
        <div class="mb-3">
          <!-- 서버에 insert 문 호출 -->
          <button
            class="btn btn-success btn-sm float-left"
            :disabled="!currentImage"
            @click="upload"
          >
            Upload
          </button>
        </div>
        <!-- Upload 버튼 : insert 문 끝 -->
      </div>
    </div>
    <!-- Upload 끝 -->

    <!-- 미리보기 이미지 시작  -->
    <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div>
    <!-- 미리보기 이미지 끝 -->

    <!-- 서버 에러 메세지가 있을 경우 아래 출력 시작-->
    <div v-if="message" class="alert alert-secondary" role="alert">
      {{ message }}
    </div>
    <!-- 서버 에러 메세지가 있을 경우 아래 출력 끝-->

    <!--쇼핑 카트 형태 디자인 시작 -->
    <!-- v-for 시작 -->
    <div class="row">
      <div class="col-sm-6" v-for="(data, index) in fileDb" :key="index">
        <div class="card">
          <img :src="data.fileUrl" class="card-img-top" alt="강의" />
          <div class="card-body">
            <h5 class="card-title">{{ data.fileTitle }}</h5>
            <p class="card-text">
              {{ data.fileContent }}
            </p>
            <a style="color: inherit" @click="deleteImage(data.fid)">
              <!-- <i class="fas fa-trash" /> -->
              <span class="badge bg-danger">Delete</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 쇼핑 카트 형태 디자인 끝 -->
  </div>
</template>

<script>
// axios 공통 함수 import
import FileDbDataService from "../../services/FileDbDataService";

export default {
  data() {
    return {
      currentImage: undefined, // 현재 이미지 변수
      previewImage: undefined, // 미리보기 이미지 변수
      message: "", // 서버쪽 메세지를 저장할 변수
      fileDb: [], // 이미지 객체 배열
      searchTitle: "", // 이미지명으로 검색하는 변수
      // springboot 요청할 변수 , 이미지명(fileTitle) , 내용(content)
      fileTitle: "",
      fileContent: "",

      // 페이징 변수들

      page: 1, // 현재 페이지
      count: 0, // 전체 데이터 건수
      pageSize: 3, // 한페이지당 몇개를 화면에 보여줄지 결정하는 변수

      pageSizes: [2, 4, 6], // select box 에 넣을 기본 데이터
    };
  },
  methods: {
    // 조회 함수
    retrieveFileDb() {
      FileDbDataService.getFiles(this.searchTitle, this.page - 1, this.pageSize)
        // 성공하면 .then() 결과가 전송됨
        .then((response) => {
          const { fileDb, totalItems } = response.data; // springboot 의 전송된 맵 정보
          this.fileDb = fileDb; // 스프링부트에서 전송한 데이터
          this.count = totalItems; // 스프링부트에서 전송한 페이지정보(총 건수)
          // 디버깅 콘솔에 정보 출력
          console.log(response.data);
        })
        // 실패하면 .catch() 에 에러가 전송됨
        .catch((e) => {
          console.log(e);
        });
    },
    // 파일 선택상자에서 선택한 이미지를 저장하는 함수
    selectImage () {
        // 첫번째 선택한 이미지를 변수에 저장
        // this.$refs : $refs 속성이 있는 컨트롤이 선택됨
        this.currentImage = this.$refs.file.files.itme(0);
        // .createObjectURL() : 이미지 주소만 참조해서 이미지 보여주기 함수
        this.previewImage = URL.createObjectURL();
        this.message = "";
    },
    // upload 함수
    upload() {
        FileDbDataService.upload (
            this.fileTitle,
            this.fileContent,
            this.currentImage,
        )
        .then((resopnse) => {
            // 서버쪽에 성공 메세지를 저장
            this.message = resopnse.data.message;

            // 화면에 재조회 요청 (axios 함수로 재조회 요청)
            return FileDbDataService.getFiles(
                this.searchTitle,
                this.page -1,
                this.pageSize
            )
        })
        // 조회가 성공하면 실행 되는 .then()
        .then((resopnse2) => {
            const {fileDb, totalItems} = resopnse2.data;
            this.fileDb = fileDb;
            this.count = totalItems;
            console.log(resopnse2.data);
        })
        .catch((e) => {
            console.log(e);
            this.message = "Could not upload the Image!" + e;
            this.currentImage = undefined;
        })
    },
    // select box 값 변경시 실행되는 함수(재조회)
    handlePageSizeChange(event) {
      this.pageSize = event.target.value; // 한페이지당 개수 저장(3, 6, 9)
      this.page =1;
      // 재조회 함수 호출
      this.retrieveFileDb();
    },
    // 페이지 번호 변경시 실행되는 함수(재조회)
    handlePageChange(value) {
      this.page = value; // 매개변수값으로 현재페이지 변경
      // 재조회 함수 호출
      this.retrieveFileDb();
    },
    deleteImage() {
        
    }
    

  },
};
</script>

<style>
</style>