import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";

interface searchCepFormInterface {
  cep: string;
  address: string;
  district: string;
  city: string;
  state: string;
  number: string;
}

interface apiResponseInterface {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

function App() {
  const { register, handleSubmit, setValue, setFocus } =
    useForm<searchCepFormInterface>();

  const onSubmitForm = (data: searchCepFormInterface) => {
    console.log(data);
  };

  const checkCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) {
      return;
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((apiData: apiResponseInterface) => {
          setValue("address", apiData.logradouro);
          setValue("city", apiData.localidade);
          setValue("district", apiData.bairro);
          setValue("state", apiData.uf);
          setFocus("number");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <h1>BUSCA ENDEREÇO</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="App-header">
        <label>
          CEP:
          <input
            type="text"
            {...register("cep")}
            onBlur={checkCEP}
            maxLength={8}
            minLength={8}
            required
          />
        </label>
        <label>
          RUA:
          <input type="text" {...register("address")} required />
        </label>
        <label>
          NUMERO:
          <input type="text" {...register("number")} required />
        </label>
        <label>
          BAIRRO:
          <input type="text" {...register("district")} required />
        </label>
        <label>
          CIDADE:
          <input type="text" {...register("city")} required />
        </label>
        <label>
          UF:
          <input
            type="text"
            {...register("state")}
            required
            maxLength={2}
            minLength={2}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
