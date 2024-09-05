import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import type { GetProp, TableProps } from "antd";
import { Button, Spin, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { NotifyError, NotifySuccess } from "../../component/alert";
import { DeleteProject, fetchProjectList } from "../../helpers/projectHelper";
import AddProjectComponent from "../../component/AddProject";
import "./index.less";
import { Project } from "./Interfaces";

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

const ProjectPage: React.FC = () => {
  const [ProjectsList, setProjectsList] = useState<Project | [] | undefined>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [Addproject, setAddproject] = useState<boolean>(false);
  const [EditProjectRecord, setEditProjectRecord] = useState<Project | null>(
    null
  );
  const [Mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortOrder: "ascend",
    sortField: "",
  });

  useEffect(() => {
    setTimeout(async () => {
      ReadHandler();
    }, 1000);
  }, [Addproject]);

  const toggle = () => setAddproject(!Addproject);

  const handleTableChange: TableProps<Project>["onChange"] = (
    pagination,
    sorter
  ) => {
    setTableParams({
      pagination,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
    // console.log("params", pagination, filters, sorter, extra);
  };

  const ReadHandler = async () => {
    let apiResponse: any = await fetchProjectList();
    if (apiResponse.response) {
      setProjectsList(apiResponse.response);
      setLoading(false);
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const DeleteHandler = async (record: Project) => {
    let apiResponse = await DeleteProject(record);
    console.log("delete", apiResponse);
    if (apiResponse?.response) {
      NotifySuccess(apiResponse?.response.message);
      ReadHandler();
    } else if (apiResponse?.error) {
      NotifyError(apiResponse?.error);
    }
  };

  const EditHandler = async (record: Project) => {
    let newObj: any = {
      ...record,
      staff: record.staff.id,
      manager: record.manager.id,
      customer: record.customer.id,
      dueDate: new Date(record.dueDate),
    };
    setAddproject(true);
    setEditProjectRecord(newObj);
    setMode("EDIT");
  };

  const columns: ColumnsType<Project> = [
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      render: (customer) => `${customer.name}`,
      width: "10%",
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
    },
    {
      title: "REF NUMBER",
      dataIndex: "referenceNumber",
      width: "20%",
      sorter: (a, b) => a.referenceNumber.localeCompare(b.referenceNumber),
    },
    {
      title: "Project Reference",
      key: "projectReference",
      children: [
        {
          key: "projectName",
          title: "Project Name",
          dataIndex: "projectName",
          width: "10%",
        },
        {
          title: "Project Number",
          dataIndex: "projectNumber",
          width: "10%",
        },
      ],
    },
    {
      title: "Project Location",
      children: [
        {
          title: "Location",
          dataIndex: "location",
          width: "15%",
        },
        {
          title: "Address",
          dataIndex: "address",

          width: "15%",
        },
      ],
    },
    {
      title: "Action",
      children: [
        {
          title: "Delete",
          dataIndex: "id",
          key: "x",
          render: (_, record) => (
            <DeleteTwoTone
              style={{ fontSize: "20px", color: "blue" }}
              onClick={() => {
                DeleteHandler(record);
              }}
            />
          ),
          width: "5%",
        },
        {
          title: "Edit",
          dataIndex: "id",
          key: "x",
          render: (_, record) => (
            <EditTwoTone
              style={{ fontSize: "20px", color: "blue" }}
              onClick={() => EditHandler(record)}
            />
          ),
          width: "5%",
        },
      ],
    },
  ];

  return (
    <div className="Project">
      {Addproject ? (
        <AddProjectComponent
          toggle={toggle}
          Mode={Mode}
          setMode={setMode}
          EditProjectRecord={EditProjectRecord}
          setEditProjectRecord={setEditProjectRecord}
        />
      ) : (
        <>
          <div className="Projectheading">
            <span className="ProjectText">Projects</span>
            <Button
              type="primary"
              onClick={() => {
                setMode("ADD");
                setAddproject(true);
              }}
            >
              Add project
            </Button>
          </div>
          <Spin spinning={loading} className="app-loading-wrapper" />
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={ProjectsList}
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

export default ProjectPage;
