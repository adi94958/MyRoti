import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import CekLogin from "../../auth/CekLogin";

const TABLE_HEAD = ["Nama Lapak", "Alamat", "Area Lapak", "Nama Kurir"];

export default function Lapak() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 2) {
        navigate("/admin");
    }
    handleData();
  }, []);

  function handleData() {
    axios
      .get("http://localhost:8000/api/koordinator/lapak")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleDelete(id) {
    console.log(id)
    axios
      .delete(`http://localhost:8000/api/koordinator/lapak/delete/${id}`)
      .then(handleData)
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleEdit(item) {
    localStorage.setItem(
      "dataLapak",
      JSON.stringify({
        kode_lapak: item.kode_lapak,
        nama_lapak: item.nama_lapak,
        alamat_lapak: item.alamat_lapak,
        kurir: item.nama,
        area: item.area_distribusi
      })
    );
    navigate("/koordinator/data_lapak/edit");
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex items-center justify-between gap-8">
          <div>
            <Typography color="blue-gray" className="text-4xl font-serif">
              Data Lapak
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/koordinator/data_lapak/regis">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" /> Add Lapak
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-2 py-3">
        <table className="w-full min-w-max table-auto text-left border border-blue-gray-100">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 flex justify-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  No
                </Typography>
              </th>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 flex justify-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item.kode_lapak}>
                  <td className={classes}>
                    <div className="flex justify-center">
                      <Typography>{index + 1}</Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.nama_lapak}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.alamat_lapak}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.area_distribusi}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.nama}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-center">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(item.kode_lapak)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() => handleEdit(item)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}