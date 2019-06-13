module.exports = {
    // 成功
    SUCCESS:                    '0',

    // 公共参数错误
    NOTNULL_TIMESTAMP:          '100010',
    ERROR_FORMAT_TIMESTAMP:     '100011',
    NOTNULL_NONCE:              '100020',
    ERROR_FORMAT_NONCE:         '100021',
    NOTNULL_SHOW_UID:           '100030',
    ERROR_FORMAT_SHOW_UID:      '100031',
    NOTNULL_SIGN:               '100040',
    ERROR_FORMAT_SIGN:          '100041',
    LIMIT_ERROR:                '100061',//您提交的太过频繁了，请休息一会吧.
    ILLEGAL_ERROR:              '100062',//非法操作
    ACTION_FAIL_ERROR:          '100063',//操作失败，请重试.
    ACTION_EXCEPTION_ERROR:     '100064',//操作异常，请重试.
    ERROR_UPGRADE_REMIND:       '100070',//APP升级提醒

    ERROR_FORMAT_PARAMS:        '200001', // 参数格式错误
    ERROR_FORMAT_ACCOUNT:       '200002', // 账号格式错误
    ERROR_FORMAT_PWD:           '200003', // 密码格式错误
    INVALID_ACCOUNT_OR_PWD:     '200004', // 账号或密码不正确
    USER_NOT_EXIST:             '200005', // 用户不存在
    ERROR_FORMAT_OS_TYPE:       '200006', // 系统类型格式错误
    ACCOUNT_BEEN_REGISTERED:    '200014', // 该账号已经被注册

    // 权限相关错误
    INVALID_TOKEN:              '300001',
    INVALID_SIGN:               '300101',
    FORBIDDEN:                  '300201',

    // HTTP 错误
    HTTP_NOT_FOUND:             '500404',
    HTTP_INTERNAL_SERVER_ERROR: '500500'
};


