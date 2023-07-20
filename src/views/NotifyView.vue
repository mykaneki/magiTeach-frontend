// Path: /src/views/NotifyView.vue
<template>
    <el-container>
        <el-header>
            <h1>Magic Teacher</h1>
        </el-header>
        <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu index="1">
                <router-link to="/notify">
                    <el-menu-item index="1-1">
                        通知
                    </el-menu-item>
                </router-link>
                <router-link to="/plan">
                    <el-menu-item index="1-2">
                        教案
                    </el-menu-item>
                </router-link>
                <router-link to="/chat">
                    <el-menu-item index="1-2">
                        chat
                    </el-menu-item>
                </router-link>
                <router-link to="/about">
                    <el-menu-item index="1-2">
                        关于
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-aside> -->

        <el-container>
            <el-main width="60%">
                <el-row gutter=15>
                    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                        <!-- <el-col :span="21">
                            <el-form-item label="职能" prop="role">
                                <el-select v-model="formData.role" placeholder="请选择职能，行政或教学职能" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in roleOptions" :key="index" :label="item.label"
                                        :value="item.value" :disabled="item.disabled"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="formData.role == 1" :span="21">
                            <el-form-item label="行政岗位" prop="administrativeposition">
                                <el-input v-model="formData.administrativeposition" placeholder="请输入学段+岗位名称，如“初中校长”，“小学副校长”"
                                    :maxlength="20" show-word-limit clearable :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col v-if="formData.role == 2" :span="21">
                            <el-form-item label="教师岗位" prop="teacherposition">
                                <el-input v-model="formData.teacherposition" placeholder="请输入学段+学科名称，如“八年级数学”，“三年级语文”"
                                    :maxlength="20" show-word-limit clearable :style="{ width: '100%' }">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-row gutter=15>
                                <el-col :span="10">
                                    <el-form-item label="面向人群（可多选）" prop="facepeople">
                                        <el-checkbox-group v-model="formData.facepeople" size="medium">
                                            <el-checkbox v-for="(item, index) in facepeopleOptions" :key="index"
                                                :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-col>
                                <el-col v-if="formData.facepeople.includes(5)" :span="7">
                                    <el-form-item label="请输入" prop="ortherpeople">
                                        <el-input v-model="formData.ortherpeople" placeholder="其他" clearable
                                            :style="{ width: '100%' }">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="主题" prop="articletheme">
                                <el-input v-model="formData.articletheme" placeholder="请输入相关主题" clearable
                                    :style="{ width: '100%' }">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="篇幅" prop="articlelen">
                                <el-radio-group v-model="formData.articlelen" size="medium">
                                    <el-radio v-for="(item, index) in articlelenOptions" :key="index" :label="item.value"
                                        :disabled="item.disabled">{{ item.label }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="文章类型" prop="articletype">
                                <el-select v-model="formData.articletype" placeholder="请选择文章类型" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in articletypeOptions" :key="index" :label="item.label"
                                        :value="item.value" :disabled="item.disabled"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formData.articletype == 3" label="请输入" prop="ortherarticletype">
                                <el-input v-model="formData.ortherarticletype" placeholder="其他" clearable
                                    :style="{ width: '100%' }">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="风格" prop="articlestyle">
                                <el-radio-group v-model="formData.articlestyle" size="medium">
                                    <el-radio v-for="(item, index) in articlestyleOptions" :key="index" :label="item.value"
                                        :disabled="item.disabled">{{ item.label }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-col>
                                <el-form-item label="详细要求" prop="otherdemand">
                                    <el-input v-model="formData.otherdemand" type="textarea" placeholder="如要求时间，具体细节等"
                                        show-word-limit :autosize="{ minRows: 1, maxRows: 4 }" :style="{ width: '100%' }"
                                        :defaultValue="无"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item size="large">
                                <el-button type="primary" @click="submitForm" :loading="false">提交</el-button>
                                <el-button @click="resetForm">重置</el-button>
                                <el-button v-if="loading == true" type="primary">加载中</el-button>
                                <el-button id="copyBtn" icon="el-icon-copy-document" v-clipboard:copy="() => responsecontent"
                                    v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError">
                                    复制
                                </el-button>

                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="hidden-sm-and-up">
                            <!-- 比平板大则隐藏 -->
                            <el-input id="elinput" type="textarea" autosize placeholder="请耐心等待" v-model="responsecontent">
                            </el-input>
                        </el-col>
                    </el-form>
                </el-row>

            </el-main>
            <el-aside class="hidden-sm-and-down" width="40%" style="background-color: rgb(238, 241, 246)">
                <!-- 比手机小则隐藏 -->
                <el-input id="elinput" type="textarea" autosize placeholder="请耐心等待" v-model="responsecontent">
                </el-input>
            </el-aside>
        </el-container>

    </el-container>
</template>
<script>
import axios from 'axios'
// import ChatBubble from '@/components/ChatBubble.vue'
import 'element-ui/lib/theme-chalk/display.css';


export default {
    name: 'NotifyView',
    components: {
    },
    props: [],
    data() {
        return {
            formData: {
                // role: undefined,
                // administrativeposition: '',
                // grade: [],
                teacherposition: '',
                facepeople: [],
                ortherpeople: undefined,
                articletheme: undefined,
                articlelen: undefined,
                articletype: undefined,
                articlestyle: undefined,
                otherdemand: undefined,
            },
            rules: {
                // role: [{
                //     required: true,
                //     message: '请选择职能，行政或教学职能',
                //     trigger: 'change'
                // }],
                // administrativeposition: [{
                //     required: true,
                //     message: '请输入学段+岗位名称，如“初中校长”，“小学副校长”',
                //     trigger: 'blur'
                // }],
                // grade: [{
                //     required: true,
                //     type: 'array',
                //     message: '请至少选择一个',
                //     trigger: 'change'
                // }],
                teacherposition: [{
                    required: true,
                    message: '请输入学段+学科名称，如“八年级数学”，“三年级语文”',
                    trigger: 'blur'
                }],
                facepeople: [{
                    required: true,
                    type: 'array',
                    message: '请至少选择一个',
                    trigger: 'change'
                }],
                ortherpeople: [{
                    required: true,
                    message: '其他',
                    trigger: 'blur'
                }],
                articletheme: [{
                    required: true,
                    message: '请输入相关主题',
                    trigger: 'blur'
                }],
                articlelen: [{
                    required: true,
                    message: '篇幅不能为空',
                    trigger: 'change'
                }],
                articletype: [{
                    required: true,
                    message: '请选择文章类型',
                    trigger: 'change'
                }],
                ortherarticletype: [{
                    required: true,
                    message: '其他',
                    trigger: 'blur'
                }],
                articlestyle: [{
                    required: true,
                    message: '风格不能为空',
                    trigger: 'change'
                }],
                otherdemand: [{
                    required: true,
                    message: '如要求时间，具体细节等',
                    trigger: 'blur'
                }],
            },
            roleOptions: [{
                "label": "行政",
                "value": 1
            }, {
                "label": "教学",
                "value": 2
            }],
            gradeOptions: [],
            facepeopleOptions: [{
                "label": "学生",
                "value": 1
            }, {
                "label": "家长",
                "value": 2
            }, {
                "label": "教师",
                "value": 3
            }, {
                "label": "同事",
                "value": 4
            }, {
                "label": "其他",
                "value": 5
            }],
            facepeopleOptions: [{
                "label": "学生",
                "value": 1
            }, {
                "label": "家长",
                "value": 2
            }, {
                "label": "教师",
                "value": 3
            }, {
                "label": "同事",
                "value": 4
            }, {
                "label": "其他",
                "value": 5
            }],
            articlelenOptions: [{
                "label": "短",
                "value": 1
            }, {
                "label": "中",
                "value": 2
            }, {
                "label": "长",
                "value": 3
            }],
            articletypeOptions: [{
                "label": "通知",
                "value": 1
            }, {
                "label": "邮件",
                "value": 2
            }, {
                "label": "其他",
                "value": 3
            }],
            articlestyleOptions: [{
                "label": "严谨",
                "value": 1
            }, {
                "label": "活泼",
                "value": 2
            }],
            gradeProps: {
                "multiple": false,
                "label": "label",
                "value": "value",
                "children": "children"
            },
            facepeopleProps: {
                "multiple": true,
                "label": "label",
                "value": "value",
                "children": "children"
            },
            ortherdemand: [],
            responsecontent: '',
            loading: "true"
        }
    },
    computed: {},
    watch: {},
    created() {
        console.log('NotifyView created');
    },
    mounted() {

    },
    methods: {
        submitForm() {
            console.log(JSON.stringify(this.formData));
            this.$refs['elForm'].validate(valid => {
                if (!valid) return
                this.loading = true;
                // TODO 提交表单
                axios.post('/api/submit', this.formData, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        // 处理后端响应
                        console.log(response.data.data);
                        this.responsecontent = '提交成功，请等待';
                        this.responsecontent = response.data.data;
                        this.loading = false;

                    })
                    .catch(error => {
                        // 处理请求错误
                        this.responsecontent = '提交失败';
                        this.responsecontent = JSON.stringify(error);
                        this.loading = false;
                    })
            })
        },
        // 重置表单
        resetForm() {
            this.$refs['elForm'].resetFields()
            this.loading = false;
        },
        onCopySuccess() {
            this.$message.success("复制成功");
        },
        onCopyError() {
            this.$message.error("复制失败");
        },

    }

}


</script>

<style scoped>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 90%;
}
</style>

