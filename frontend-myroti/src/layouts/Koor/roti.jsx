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

const TABLE_HEAD = ["Nama Roti", "Stok Roti", "Rasa Roti", "Harga Satuan Roti"];

export default function Roti() {
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
      .get("http://localhost:8000/api/koordinator/dataroti")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/api/koordinator/dataroti/delete/${id}`)
      .then(handleData)
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleEdit(item) {
    localStorage.setItem(
      "dataRoti",
      JSON.stringify({
        id: item.id,
        kode_roti: item.kode_roti,
        nama_roti: item.nama_roti,
        stok_roti: item.stok_roti,
        rasa_roti: item.rasa_roti,
        harga_satuan_roti: item.harga_satuan_roti,
      })
    );
    navigate("/koordinator/data_roti/edit");
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex items-center justify-between gap-8">
          <div>
            <Typography color="blue-gray" className="text-4xl font-serif">
              Data Roti
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/koordinator/data_roti/regis">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" /> Add Roti
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
                <tr key={item.id}>
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
                        {item.nama_roti}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.stok_roti}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.rasa_roti}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.harga_satuan_roti}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-center">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(item.kode_roti)}
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