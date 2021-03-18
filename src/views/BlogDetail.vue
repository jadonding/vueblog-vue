<template>
  <div>
    <Header></Header>

    <div class="m-blog">
      <h2 class="m-h2">{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-show="isOwner">
        <router-link :to="{name :'BlogEdit',params:{blogId : blog.id}}">
          编辑
        </router-link>
      </el-link>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import 'github-markdown-css'

export default {
  name: "BlogDetail",
  components: {Header},
  data() {
    return {
      blog: {
        id: '',
        title: '',
        content: ''
      },
      isOwner: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    console.log(blogId);
    const _this = this;
    this.$axios.get("/blog/" + blogId).then(res => {
      const blog = res.data.data;
      console.log(blog);
      _this.blog.id = blog.id;
      _this.blog.title = blog.title;
      var markdown = require("markdown-it");
      let md = new markdown();
      let result = md.render(blog.content);
      _this.blog.content = result;
      _this.isOwner = (blog.userId === _this.$store.getters.getUser.id)
    })
  }
}
</script>

<style scoped>
.m-h2 {
  text-align: center;
}

.m-blog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}

</style>
