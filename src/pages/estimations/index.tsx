import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import type { GetProp, TableProps } from "antd";
import { Button, Spin, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import AddEstimationPage from "../../component/AddEstimation";
import { NotifyError, NotifySuccess } from "../../component/alert";
import {
  DeleteEstimation,
  fetchEstimationsList,
} from "../../helpers/estimationHelper";
import { Estimation } from "./Interfaces";
import "./index.less";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;
export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
}

const EstimationPage: React.FC = () => {
  const [EstimationList, setEstimationList] = useState<
    readonly Estimation[] | []
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [AddEstimation, setAddEstimation] = useState<boolean>(false);
  const [EditEstimationRecord, setEditEstimationRecord] =
    useState<Estimation | null>(null);
  const [Mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    setTimeout(async () => {
      ReadHandler();
    }, 1000);
  }, [AddEstimation]);

  const toggle = () => setAddEstimation(!AddEstimation);

  const handleTableChange: TableProps<Estimation>["onChange"] = (
    pagination,
    sorter
  ) => {
    console.log("sorter", sorter);
    setTableParams({
      pagination,
      // sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      // sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  const ReadHandler = async () => {
    let apiResponse: any = await fetchEstimationsList();
    if (apiResponse?.response) {
      setEstimationList(apiResponse.response);
      setLoading(false);
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const DeleteHandler = async (record: Estimation) => {
    let apiResponse = await DeleteEstimation(record);
    if (apiResponse?.response) {
      NotifySuccess(apiResponse?.response.message);
      ReadHandler();
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const EditHandler = async (record: Estimation) => {
    let newObj: any = {
      ...record,
      project: record.project.id,
    };
    setAddEstimation(true);
    setEditEstimationRecord(newObj);
    setMode("EDIT");
  };

  const columns: ColumnsType<Estimation> = [
    {
      title: "Version",
      dataIndex: "version",
      width: "10%",
    },
    {
      title: "Project",
      dataIndex: "project",
      sorter: true,
      render: (project) => `${project.name}`,
      width: "20%",
    },
    {
      title: "Client",
      dataIndex: "client",
      sorter: true,
      width: "20%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      width: "15%",
    },

    {
      title: "Last Modified",
      dataIndex: "lastmodified",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
    },
    {
      title: "Action",
      children: [
        {
          title: "Delete",
          dataIndex: "id",
          key: "x",
          render: (_, record) => (
            <DeleteTwoTone onClick={() => DeleteHandler(record)} />
          ),
          width: "5%",
        },
        {
          title: "Edit",
          dataIndex: "id",
          key: "x",
          render: (_, record) => (
            <EditTwoTone onClick={() => EditHandler(record)} />
          ),
          width: "5%",
        },
      ],
    },
  ];

  return (
    <div className="Estimation">
      {AddEstimation ? (
        <AddEstimationPage
          toggle={toggle}
          Mode={Mode}
          setMode={setMode}
          EditEstimationRecord={EditEstimationRecord}
          setEditEstimationRecord={setEditEstimationRecord}
        />
      ) : (
        <>
          <div className="Estimationheading">
            <span className="EstimationText">Estimations</span>
            <Button
              type="primary"
              onClick={() => {
                setMode("ADD");
                setAddEstimation(true);
              }}
            >
              Add Estimation
            </Button>
          </div>
          <Spin spinning={loading} className="app-loading-wrapper" />
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={EstimationList}
            pagination={tableParams.pagination}
            // loading={loading}
            onChange={handleTableChange}
            size="small"
          />
        </>
      )}
    </div>
  );
};

export default EstimationPage;
