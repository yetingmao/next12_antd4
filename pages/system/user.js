import React, { useState, useEffect } from "react";
import {
    Button,
    message,
    Table,
    Modal,
    Input,
    Divider,
    Select,
    Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUser, getRole, addUser, updateUser, delUser } from "api";
import { Util } from "utils";
import styles from "styles/common.module.scss";

const { confirm } = Modal;
const { Option } = Select;

export default function (props) {
    //初始化
    const [_fNode, set_fNode] = useState();
    const [_bNode1, set_bNode1] = useState();
    const [tHeight, setTHeight] = useState(0);
    //首页初次加载，只根据分页去更新列表
    useEffect(() => {
        if (_fNode && _bNode1) {
            setTHeight(Util.initTableHeight(_fNode, [_bNode1], 136));//操作按钮，分页，padding值40
        }
    }, [_fNode, _bNode1]);

    //页面数据
    const [roles, setRoles] = useState([]);
    const [dataList, setDataList] = useState([]);
    //首页初次加载，只根据分页去更新列表
    useEffect(() => {
        roleList();
        getList();
    }, []);
    // 模态框显示
    const [modelShow, setModelShow] = useState(false);
    //
    const [data, setData] = useState({
        roleIds: [],
    });
    // 用户
    const [query, setQuery] = useState({});
    const [pagination, setPagination] = useState({
        // hideOnSinglePage: true, //只有一页默认隐藏
        defaultCurrent: 1, //默认当前页
        current: 1, //当前页
        defaultPageSize: 10, //默认每页多少条
        pageSize: 10, //每页多少条
        total: 0, //总数目
        onChange: (page, pageSize) => {
            //回调函数
            const tempPagination = { ...pagination, pageSize, current: page };
            setPagination(tempPagination);
        },
    });
    const columns = [
        {
            title: "用户名称",
            key: "nickName",
            dataIndex: "nickName",
            align: "center",
            width: "10%",
        },
        {
            title: "手机号码",
            key: "phonenumber",
            dataIndex: "phonenumber",
            align: "center",
            width: "15%",
        },
        {
            title: "用户昵称",
            key: "userName",
            dataIndex: "userName",
            align: "center",
            width: "10%",
        },
        {
            title: "角色",
            key: "roles",
            dataIndex: "roles",
            align: "center",
            width: "40%",
            render: (text, record, index) => {
                let temp = "暂无";
                if (text && text.length) {
                    temp = text.map((item) => (
                        <Tag key={item.roleId} color="blue">
                            {item.roleName}
                        </Tag>
                    ));
                }
                return <div>{temp}</div>;
            },
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "center",
            width: "15%",
            render: (text, record, index) => (
                <div>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setData(record);
                            setModelShow(!modelShow);
                        }}
                    />
                    <Divider type="vertical" />
                    <Button
                        type="danger"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            del(record["userId"]);
                        }}
                    />
                </div>
            ),
        },
    ];
    const roleEle = roles.map((item) => (
        <Option key={item.roleId}>{item.roleName}</Option>
    ));

    return (
        <div className={styles.content}>
            <Modal
                wrapClassName={styles.template_model}
                title={data.userId ? "修改" : "添加"}
                visible={modelShow}
                onOk={() => addOrUp()}
                onCancel={() => {
                    setModelShow(!modelShow);
                }}
            >
                <div className={styles.model_menu}>
                    <div className={styles.menu_name}>
                        {" "}
                        <div className={styles.name_wain}>*</div>用户昵称：
                    </div>
                    <div className={styles.menu_value}>
                        <Input
                            placeholder=""
                            value={data.userName}
                            onChange={(e) => {
                                setData({ ...data, userName: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.model_menu}>
                    <div className={styles.menu_name}>
                        {" "}
                        <div className={styles.name_wain}>*</div>用户名称：
                    </div>
                    <div className={styles.menu_value}>
                        <Input
                            placeholder=""
                            value={data.nickName}
                            onChange={(e) => {
                                setData({ ...data, nickName: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.model_menu}>
                    <div className={styles.menu_name}>
                        {" "}
                        <div className={styles.name_wain}>*</div>用户密码：
                    </div>
                    <div className={styles.menu_value}>
                        <Input
                            placeholder=""
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.model_menu}>
                    <div className={styles.menu_name}> 手机号码：</div>
                    <div className={styles.menu_value}>
                        <Input
                            value={data.phonenumber}
                            onChange={(e) => {
                                setData({ ...data, phonenumber: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.model_menu}>
                    <div className={styles.menu_name}> 用户角色：</div>
                    <div className={styles.menu_value}>
                        <Select
                            value={data.roleIds}
                            mode="multiple"
                            style={{ width: "100%" }}
                            onSelect={(vaule) => {
                                setData({ ...data, roleIds: [...data.roleIds, vaule] });
                            }}
                            onDeselect={(string) => {
                                const roleIds = data.roleIds.filter((item) => item != string);
                                setData({
                                    ...data,
                                    roleIds,
                                });
                            }}
                        >
                            {roleEle}
                        </Select>
                    </div>
                </div>
            </Modal>
            <div className={styles.template}
                ref={(node) => {
                    set_fNode(node);
                }}>
                <div className={styles.body}>
                    <div
                        className={styles.action}
                        ref={(node) => {
                            set_bNode1(node);
                        }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setData({ roleIds: [] });
                                setModelShow(!modelShow);
                            }}>
                            添加
                        </Button>
                    </div>
                    <div className={styles.middle}>
                        <Table
                            rowKey={(record) => record.userId}
                            columns={columns}
                            pagination={pagination}
                            dataSource={dataList}
                            scroll={{ y: tHeight, scrollToFirstRowOnChange: true }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    /**
     * @description: 获取列表
     * @param {type}
     * @return:
     * @author: yetm
     */
    async function getList() {
        const page = pagination.current;
        const limit = pagination.pageSize;
        const res = await getUser({ ...query, pageNum: page, pageSize: limit });
        const { total, rows } = res;
        setPagination({ ...pagination, total });
        for (const item of rows) {
            if (item.roleIds) {
                item.roleIds = item.roleIds.map((item) => `${item}`);
            }
        }
        setDataList(rows);
    }
    async function roleList() {
        const res = await getRole();
        const { rows } = res;
        setRoles(rows);
    }

    /**
     * @description: 创建或更新
     * @param {type}
     * @return:
     * @author: yetm
     */
    async function addOrUp() {
        const { userId, userName, nickName, password } = data;
        if (!userName) {
            message.error("用户昵称不能为空");
            return;
        }
        if (!nickName) {
            message.error("用户名称不能为空");
            return;
        }

        if (userId) {
            const res = await updateUser(data);
            if (res.code === 200) {
                message.success("更新成功");
            } else {
                message.error(res.msg);
            }
            // 更新
        } else {
            if (!password) {
                message.error("密码不能为空");
                return;
            }
            // //创建
            const res = await addUser(data);
            if (res && res.code === 200) {
                message.success("新增成功");
            } else {
                message.error(res.msg);
            }
        }
        await getList();
        setModelShow(false);
    }
    function del(id) {
        confirm({
            content: "确定要删除这条记录吗",
            onOk: async () => {
                const res = await delUser(id);
                if (res && res.code === 200) {
                    message.success("删除成功");
                } else {
                    message.error(res.msg);
                }
                getList();
            },
        });
    }
}
