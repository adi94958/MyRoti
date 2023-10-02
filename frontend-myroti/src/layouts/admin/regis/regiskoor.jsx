import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
   
  export default function RegisKoor() {
    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Tambah Akun Koordinator
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Username" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Link to="/admin/koordinator">
            <Button className="mt-6" fullWidth>
                Register
            </Button>
          </Link>
        </form>
      </Card>
    );
  }