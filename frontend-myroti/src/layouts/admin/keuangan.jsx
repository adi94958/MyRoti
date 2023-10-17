import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CekLogin from "../../auth/CekLogin";

const TABLE_HEAD = ["Nama", "Username", "Password"];

const TABLE_ROWS = [
  {
    id: 1,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 2,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 3,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 4,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 5,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 6,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
  {
    id: 7,
    name: "Muhammad Adi",
    username: "adi123",
    password: "123adi",
  },
];

export default function Keuangan() {
  const navigate = useNavigate;
  useEffect(() => {
    const cekLogin = CekLogin();
    if (cekLogin !== 1) {
      navigate("/koor");
    }
  }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-4xl font-serif" color="blue-gray">
              Akun Keuangan
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3 rounded-full" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-6 w-5" /> Add member
            </Button>
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
            {TABLE_ROWS.map(({ id, name, username, password }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex justify-center">
                      <Typography>{id}</Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography>{name}</Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {username}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {password}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-center">
                      <Tooltip content="Delete User">
                        <IconButton variant="text">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
