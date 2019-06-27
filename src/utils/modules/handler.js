const badRequest = {
  invalid_id: '无效参数',
  invalid_start_date: '无效日期'
}
const unauthorized = {
  invalid_session: '未登录',
  timeout_session: '登录过期'
}
const forbidden = {
  permission_deny: '权限不足',
  faked_task: '任务不存在',
  invalid_answer: '无效回答',
  not_allow_status: '此状态不允许此次操作',
  not_allow_index: '题号不符合顺序或存在重复',
  not_allow_max_choose: '不允许的最大选项数',
  not_allow: '不允许此操作',
  exist_questionnaire: '问卷已存在',
  not_allow_type: '此任务非问卷类型',
  faked_like: '还未点赞, 无法取消点赞',
  exist_like: '已点赞',
  exist_task: '已收藏',
  faked_user: '用户不存在',
  exist_player: '你已经参加了，不要重复参加了呀',
  max_player: '参与人数已经到达上限啦',
  not_allow_edit: '该状态下不允许修改',
  not_allow_date: '无效日期',
  not_allow_max_player: '不允许的参与用户上限',
  not_allow_reward_value: '不允许降低酬劳数值',
  title_too_long: '任务标题不能超过32个字符',
  content_too_long: '任务内容不能超过256个字符',
  reward_object_too_long: '任务酬劳不能超过32个字符',
  location_too_long: '任务地点不能超过64个字符',
  tag_too_long: '任务标签不能超过16个字符',
  not_allow_finish: '不允许关闭，参与人员尚未处理完毕',
  faked_file: '图片/文件不存在',
  error_file_type: '文件类型(图片/附件)错误',
  not_allow_other_draft: '不允许查询他人的草稿'
}

export default {
  check: function(error) {
    console.log(error.response)
    let status = error.response.status
    switch (status) {
      case 400:
        this.$message.error(badRequest[error.response.data.message])
        break
      case 401:
        this.$message.error(unauthorized[error.response.data.message])
        this.$router.push({ path: '/' })
        break
      case 403:
        this.$message.error(forbidden[error.response.data.message])
        break
    }
  }
}
