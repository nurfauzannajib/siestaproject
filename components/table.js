import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { rawData } from "./Data";
import Select from "react-select";

export function TableStudents() {
  const [students, setStudents] = useState([]);
  const init = async () => {
    setStudents(await all());
  };
  useEffect(() => {
    init();
  }, []);

  const all = async () => {
    const data = [];
    for (let i = 0; i < rawData.students.length; i++) {
      data.push({
        id: rawData.students[i].id,
        name: rawData.students[i].name,
        nisn: rawData.students[i].nisn,
        class: rawData.students[i].class,
        school: rawData.students[i].school,
        status: statusKehadiran(rawData.students[i].id),
      });
    }
    return data;
  };

  async function filter(status) {
    const data = await all();
    if (status == "Semua") {
      setStudents(data);
    } else {
      setStudents(data.filter((student) => student.status === status));
    }
  }

  const checkSick = (id) => {
    return rawData.sicks.filter((student) => student.id === id).length == 0
      ? false
      : true;
  };

  const checkPermittedLeave = (id) => {
    return rawData.permittedLeaves.filter((student) => student.id === id)
      .length == 0
      ? false
      : true;
  };

  const statusKehadiran = (id) => {
    if (checkSick(id)) {
      return "Sakit";
    } else if (checkPermittedLeave(id)) {
      return "Izin";
    } else {
      return "Hadir";
    }
  };

  const columns = [
    {
      name: "id"
    },
    {
      name: "Nama",
      selector: "name",
      sortable: true,
    },
    {
      name: "NISN",
      selector: "nisn",
      sortable: true,
    },
    {
      name: "Kelas",
      selector: "class",
      sortable: true,
    },
    {
      name: "Sekolah",
      selector: "school",
      sortable: true,
    },
    {
      name: "Status Kehadiran",
      selector: "status",
      sortable: true,
    },
  ];

  const options = [
    { value: "Semua", label: "Semua" },
    { value: "Sakit", label: "Sakit" },
    { value: "Izin", label: "Izin" },
    { value: "Hadir", label: "Hadir" },
  ];

  return (
    <>
      <div style={{ width: 200 }}>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={ (val) => {
            filter(val.value);
          }}
        />
      </div>
      <div style={{display: "flex",justifyContent :"center"}}>
      <Table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.nisn}</td>
              <td>{student.class}</td>
              <td>{student.school}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
}
