import type { ColProps } from "antd/es/col";
import type { FC } from "react";

import { Badge, Card, Col, List, Radio, Row } from "antd";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DataType = "all" | "online" | "offline";

interface Values {
  name: string;
  value: number;
}

interface Data {
  all: Values[];
  online: Values[];
  offline: Values[];
}

const data: Data = {
  all: [
    { name: "appliances", value: 4544 },
    { name: "drinks", value: 3321 },
    { name: "health", value: 3113 },
    { name: "clothing", value: 2341 },
    { name: "baby", value: 1231 },
    { name: "others", value: 132 },
  ],
  online: [
    { name: "appliances", value: 244 },
    { name: "drinks", value: 231 },
    { name: "health", value: 311 },
    { name: "clothing", value: 41 },
    { name: "baby", value: 121 },
    { name: "others", value: 111 },
  ],
  offline: [
    { name: "appliances", value: 99 },
    { name: "drinks", value: 188 },
    { name: "health", value: 344 },
    { name: "clothing", value: 255 },
    { name: "others", value: 65 },
  ],
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#E36E7E",
  "#8F66DE",
];

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const SalePercent: FC<{ loading: boolean }> = ({ loading }) => {
  const [dataType, setDataType] = useState<DataType>("all");

  return (
    <Card
      className="salePercent"
      title={"proportionOfSales"}
      loading={loading}
      extra={
        <Radio.Group
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="all">{"all"}</Radio.Button>
          <Radio.Button value="online">{"online"}</Radio.Button>
          <Radio.Button value="offline">{"offline"}</Radio.Button>
        </Radio.Group>
      }
    >
      <Row gutter={20}>
        <Col {...wrapperCol}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active) {
                    const { name, value } = payload[0];
                    const total = data[dataType]
                      .map((d) => d.value)
                      .reduce((a, b) => a + b);
                    const percent = ((value / total) * 100).toFixed(2) + "%";

                    return (
                      <span className="customTooltip">
                        {name} : {percent}
                      </span>
                    );
                  }

                  return null;
                }}
              />
              <Pie
                strokeOpacity={0}
                data={data[dataType]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data[dataType].map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col {...wrapperCol}>
          <List<Values>
            bordered
            dataSource={data[dataType]}
            renderItem={(item, index) => {
              const total = data[dataType]
                .map((d) => d.value)
                .reduce((a, b) => a + b);
              const percent = ((item.value / total) * 100).toFixed(2) + "%";

              return (
                <List.Item>
                  <Badge color={COLORS[index]} />
                  <span>{item.name}</span> | <span>{item.value}</span>{" "}
                  <span>¥ {percent}</span>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SalePercent;
