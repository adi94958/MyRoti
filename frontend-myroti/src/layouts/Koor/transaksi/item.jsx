import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const roti = [
  {
    kode_roti: 1,
    nama_roti: "Roti Bantal",
    stok_roti: 40,
    rasa_roti: "Strawberry",
    harga_satuan_roti: 30000,
  },
  {
    kode_roti: 2,
    nama_roti: "Roti Bantal",
    stok_roti: 40,
    rasa_roti: "coklat",
    harga_satuan_roti: 30000,
  },
  {
    kode_roti: 3,
    nama_roti: "Roti Bantal",
    stok_roti: 40,
    rasa_roti: "ayam",
    harga_satuan_roti: 30000,
  },
];

const Transaksi = () => {
  const [roti, setRoti] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    const updatedCart = cart.map((cartItem) => {
      const correspondingRoti = roti.find(
        (rotiItem) => rotiItem.kode_roti === cartItem.kode_roti
      );
      if (correspondingRoti) {
        return { ...cartItem, quantity: correspondingRoti.quantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
  }, [roti]);

  function handleData() {
    axios
      .get("http://localhost:8000/api/koordinator/dataroti")
      .then((response) => {
        setRoti(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleQuantityChange = (kode_roti, newQuantity) => {
    setQuantityChanges((prevQuantityChanges) => ({
      ...prevQuantityChanges,
      [kode_roti]: newQuantity,
    }));
  };

  const handleToCart = (kode_roti, jumlah) => {
    const item = { kode_roti, quantity: jumlah };
    setCart([...cart, item]);
    setQuantityChanges({ ...quantityChanges, [kode_roti]: 0 });
    console.log("Cart setelah penambahan item:", cart);
  };

  const handleCart = () => {
    console.log(cart);

    const kodeRotiArray = cart.map((item) => item.kode_roti.toString());
    const jumlahRotiArray = cart.map((item) => item.quantity);

    const transaksi = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray
    };
  
    const lapak = JSON.parse(localStorage.getItem("dataLapak"));
    axios
      .post(
        `http://localhost:8000/api/koordinator/transaksi/create/${lapak.kode_lapak}`,
        transaksi
      )
      .then((response) => {
        console.log("Cart sent successfully", response.data);
        localStorage.removeItem("dataLapak");
        navigate("/koordinator");
      })
      .catch((error) => {
        console.error("Error sending cart data", error);
      });
  };

  function handleCancel() {
    localStorage.removeItem("dataLapak");
    navigate("/koordinator");
  }

  return (
    <div className="flex">
      <div className="w-4/5">
        <div className="flex flex-wrap">
          {roti.map((item) => (
            <Card key={item.kode_roti} className="m-4 w-64">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.nama_roti}
                </Typography>
                <Typography>
                  Rasa: {item.rasa_roti}
                  <br />
                  Stok: {item.stok_roti}
                  <br />
                  Harga Satuan:{" "}
                  {item.harga_satuan_roti.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <div className="flex items-center">
                  <Button
                    className="w-2/4 bg-red-500"
                    onClick={() =>
                      handleQuantityChange(
                        item.kode_roti,
                        (quantityChanges[item.kode_roti] || 0) - 1
                      )
                    }
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    className="w-16 h-8 mx-2 text-center border border-blue-gray-300"
                    value={quantityChanges[item.kode_roti] || 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.kode_roti,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <Button
                    className="w-2/4 bg-green-500"
                    onClick={() =>
                      handleQuantityChange(
                        item.kode_roti,
                        (quantityChanges[item.kode_roti] || 0) + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  className="pt-4 w-full mt-4"
                  onClick={() =>
                    handleToCart(
                      item.kode_roti,
                      quantityChanges[item.kode_roti]
                    )
                  }
                  disabled={roti.length === 0}
                >
                  Tambah
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-1/5">
        <Button
          className="flex flex-col p-4 mt-10 w-3/4 bg-green-500"
          onClick={handleCart}
        >
          Transaksi
        </Button>
        <Button
          className="flex flex-col item-center justify-center p-4 mt-3 w-3/4 bg-red-500"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Transaksi;
