import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Modal,
  Rate,
  Select,
  Tooltip,
  Input,
  Switch,
} from "antd";
const { TextArea } = Input;

const AttendanceModal = ({ students, attendance }) => {
  const [form] = Form.useForm();
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);

  function submitForm(values) {
    console.log(values);
  }

  return (
    <div>
      <Button
        type="primary"
        style={{ background: "#22c55e" }}
        icon={<i className="fa-solid fa-check-to-slot" />}
        onClick={() => setIsAttendanceModalVisible(true)}
      >
        Attendance
      </Button>
      {/* Attendance Modal */}
      <Modal
        title="Edit Attendance"
        open={isAttendanceModalVisible}
        onCancel={() => setIsAttendanceModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={submitForm}>
          <table className="w-full">
            <thead className="text-left">
              <tr>
                <th className="border px-2">Name</th>
                <th className="border px-2">Present</th>
                <th className="border px-2">Homework</th>
                <th className="border px-2">Participation</th>
                <th className="border px-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {students.map((i) => {
                return (
                  <Form.List key={i.id} name={i.id}>
                    {() => (
                      <tr>
                        <td className="border px-2">{i.name}</td>
                        <td className="border px-2">
                          <Form.Item name={"present"}>
                            <Switch
                              defaultValue={
                                !!attendance.find((a) => i.id === a.student_id)
                              }
                            />
                          </Form.Item>
                        </td>
                        <td className="border px-2">
                          <Form.Item name={"homework"}>
                            <Select
                              defaultValue={
                                attendance.find((a) => i.id === a.student_id)
                                  ?.homework ?? "Select"
                              }
                            >
                              <Select.Option value="Select">
                                Select option
                              </Select.Option>
                              <Select.Option value="Completed">
                                Completed
                              </Select.Option>
                              <Select.Option value="Incomplete">
                                Incomplete
                              </Select.Option>
                              <Select.Option value="Partial">
                                Partial
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </td>
                        <td className="border px-2">
                          <Form.Item name={"activeness"}>
                            <Rate
                              defaultValue={
                                attendance.find((a) => i.id === a.student_id)
                                  ?.activeness
                              }
                            />
                          </Form.Item>
                        </td>
                        <td className="border px-2">
                          <Tooltip
                            trigger={"click"}
                            title={
                              <Form.Item name={"description"}>
                                <TextArea
                                  className="text-black resize-none"
                                  defaultValue={
                                    attendance.find(
                                      (a) => i.id === a.student_id
                                    )?.description
                                  }
                                />
                              </Form.Item>
                            }
                          >
                            <span className="fa-solid fa-edit" />
                          </Tooltip>
                        </td>
                      </tr>
                    )}
                  </Form.List>
                );
              })}
            </tbody>
          </table>
          <Form.Item className="mt-3">
            <Button
              type="default"
              onClick={() => setIsAttendanceModalVisible(false)}
              className="mr-5"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttendanceModal;
