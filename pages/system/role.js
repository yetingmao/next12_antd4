import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  Table,
  Modal,
  Input,
  Divider,
  Tag,
  Checkbox,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getRole,
  addRole,
  updateRole,
  delRole,
  getRoleDetail,
  getSystem,
} from "api";
import { Util } from "utils";
import styles from "styles/common.module.scss";
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;
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
  //用户列表数据
  const [dataList, setDataList] = useState([]);
  // 模态框显示
  const [modelShow, setModelShow] = useState(false);
  const [data, setData] = useState({});
  const [systemList, setSystemList] = useState([]);
  const [checkedList1, setCheckedList1] = useState([]);
  const [indeterminate1, setIndeterminate1] = useState(true);
  const [checkAll1, setCheckAll1] = useState(false);
  const [checkedList2, setCheckedList2] = useState([]);
  const [indeterminate2, setIndeterminate2] = useState(true);
  const [checkAll2, setCheckAll2] = useState(false);
  //首页初次加载，只根据分页去更新列表
  useEffect(() => {
    getList();
    getSystemList();
  }, []);
  const [query, setQuery] = useState({});
  const [pagination, setPagination] = useState({
    hideOnSinglePage: false, //只有一页默认隐藏
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
      title: "角色名称",
      key: "roleName",
      dataIndex: "roleName",
      align: "center",
      width: "20%",
    },
    {
      title: "可编辑的系统",
      key: "canEdit",
      dataIndex: "canEdit",
      align: "center",
      width: "30%",
      render: (text, record, index) => {
        const temp = JSON.parse(text);
        let result;
        if (temp) {
          result = temp.map((item) => (
            <Tag
              style={{ marginBottom: "5px" }}
              key={item.uuid}
              color="#2db7f5"
            >
              {item.name}
            </Tag>
          ));
        }
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {result}
          </div>
        );
      },
    },
    {
      title: "可审核的系统",
      key: "canCheck",
      dataIndex: "canCheck",
      align: "center",
      width: "30%",
      render: (text, record, index) => {
        const temp = JSON.parse(text);
        let result;
        if (temp) {
          result = temp.map((item) => (
            <Tag
              style={{ marginBottom: "5px" }}
              key={item.uuid}
              color="#2db7f5"
            >
              {item.name}
            </Tag>
          ));
        }
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {result}
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: "20%",
      render: (text, record, index) => (
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              roleDetail(record);
            }}
          />
          <Divider type="vertical" />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              del(record["roleId"]);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div className={styles.content}>
      <Modal
        width="70%"
        wrapClassName={styles.template_model}
        title={data.roleId ? "修改" : "添加"}
        visible={modelShow}
        onOk={() => addOrUp()}
        onCancel={() => {
          setModelShow(!modelShow);
        }}
      >
        <div className={styles.model_menu}>
          <div className={styles.menu_name}>
            {" "}
            <div className={styles.name_wain}>*</div>角色名称：
          </div>
          <div className={styles.menu_value}>
            <Input
              placeholder=""
              value={data.roleName}
              onChange={(e) => {
                setData({ ...data, roleName: e.target.value });
              }}
            />
          </div>
        </div>
        <div className={styles.model_menu}>
          <div className={styles.menu_name}> 可编辑的系统：</div>
          <div className={styles.menu_value}>
            <Checkbox
              indeterminate={indeterminate1}
              onChange={(e) => {
                let temp = [];
                if (e.target.checked) {
                  temp = systemList.map((item) => item.value);
                }
                setCheckedList1(temp);
                setIndeterminate1(false);
                setCheckAll1(e.target.checked);
              }}
              checked={checkAll1}
            >
              全选
            </Checkbox>
            <CheckboxGroup
              options={systemList}
              value={checkedList1}
              onChange={(checkedList) => {
                setCheckedList1(checkedList);
                setIndeterminate1(
                  !!checkedList.length && checkedList.length < systemList.length
                );
                setCheckAll1(checkedList.length === systemList.length);
              }}
            />
          </div>
        </div>
        <div className={styles.model_menu}>
          <div className={styles.menu_name}> 可审核的系统：</div>
          <div className={styles.menu_value}>
            <Checkbox
              indeterminate={indeterminate2}
              onChange={(e) => {
                let temp = [];
                if (e.target.checked) {
                  temp = systemList.map((item) => item.value);
                }
                setCheckedList2(temp);
                setIndeterminate2(false);
                setCheckAll2(e.target.checked);
              }}
              checked={checkAll2}
            >
              全选
            </Checkbox>
            <CheckboxGroup
              options={systemList}
              value={checkedList2}
              onChange={(checkedList) => {
                setCheckedList2(checkedList);
                setIndeterminate2(
                  !!checkedList.length && checkedList.length < systemList.length
                );
                setCheckAll2(checkedList.length === systemList.length);
              }}
            />
          </div>
        </div>
      </Modal>
      <div className={styles.template}
        ref={(node) => {
          set_fNode(node);
        }}
      >
        <div className={styles.body}>
          <div
            className={styles.action}
            ref={(node) => {
              set_bNode1(node);
            }} >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setData({ parentId: 0 });
                setModelShow(!modelShow);
              }}>
              添加
            </Button>
          </div>
          <div className={styles.middle}>
            <Table
              rowKey={(record) => record.roleId}
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
    const res = await getRole({ ...query, pageNum: page, pageSize: limit });
    const { total, rows } = res;
    setPagination({ ...pagination, total });
    setDataList(rows);
  }
  async function roleDetail(data) {
    const { canEdit, canCheck, roleId, roleName } = data;
    setData({ roleId, roleName });
    const temp1 = JSON.parse(canEdit);
    const temp2 = JSON.parse(canCheck);
    setCheckedList1(temp1 ? temp1.map((item) => item.uuid) : []);
    setCheckedList2(temp2 ? temp2.map((item) => item.uuid) : []);
    setModelShow(!modelShow);
  }
  async function getSystemList() {
    const res = await getSystem();
    const temp = res.map((item) => {
      return {
        label: item.name,
        value: item.uuid,
      };
    });
    setSystemList(temp);
  }
  /**
   * @description: 创建或更新
   * @param {type}
   * @return:
   * @author: yetm
   */
  async function addOrUp() {
    const { roleId, roleName } = data;
    if (!roleName) {
      message.error("角色名不能为空");
      return;
    }
    const canEdit = checkedList1.map((item) => {
      const uuid = item;
      const temp = systemList.find((sys) => sys.value === item);
      return {
        uuid,
        name: temp.label,
      };
    });
    const canCheck = checkedList2.map((item) => {
      const uuid = item;
      const temp = systemList.find((sys) => sys.value === item);
      return {
        uuid,
        name: temp ? temp.label : "",
      };
    });

    if (roleId) {
      const res = await addRole({ ...data, canEdit, canCheck });
      if (res.code === 200) {
        message.success("更新成功");
      } else {
        message.error(res.mag);
      }
      // 更新
    } else {
      // //创建
      const res = await addRole({ canEdit, roleName, canCheck });
      if (res && res.code === 200) {
        message.success("新增成功");
      } else {
        message.error(res.msg);
      }
    }
    await getList();
    setModelShow(false);
    setCheckedList1([]);
    setCheckedList2([]);
  }
  function del(id) {
    confirm({
      content: "确定要删除这条记录吗",
      onOk: async () => {
        const res = await delRole(id);
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
