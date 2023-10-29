  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { UserPlusIcon } from "@heroicons/react/24/solid";
  import {RiInboxArchiveLine} from "react-icons/ri";
  import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    IconButton,
  } from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";
  import CekLogin from "../../auth/CekLogin";

  const TABLE_HEAD = ["Nama Lapak", "Area"];

  export default function Distribusi() {
    const [data,setData] = useState([]);
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
        .get("http://localhost:8000/api/koordinator/transaksi")
        .then((response) => {
          setData(response.data);
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    function handleKirim(item){
      console.log(item)
      localStorage.setItem(
        "dataLapak",
        JSON.stringify({
          kode_lapak: item
        })
      );
      navigate("/koordinator/transaksi");
    }
    return (
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-3 flex items-center justify-between gap-8">
            <div>
              <Typography color="blue-gray" className="text-4xl font-serif">
                Transaksi
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex justify-center">
                        <Typography>{index + 1}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography>{item.nama_lapak}</Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.area_distribusi}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center">
                        <IconButton
                          variant="text"
                          onClick={() => handleKirim(item.kode_lapak)}
                        >
                          <RiInboxArchiveLine className="h-8 w-8" />
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
