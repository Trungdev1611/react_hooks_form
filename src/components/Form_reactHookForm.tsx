import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IFormData {
  username: string;
  password: string;
  channel: string;
  social: {
    twiter: string;
    facebook: string;
  };
  phoneNumber: string[];
  phNumber: {number: string}[]
}
let countRender = 0;
const Form_reactHookForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }, //lấy lỗi ở trong form ra để show
  } = useForm<IFormData>({
    defaultValues: {
      username: "phamvantrung",
      password: "123456",
      channel: "channel1",
      social: {
        twiter: "trungtwiter",
        facebook: "trungfacebook",
      },
      phoneNumber: ["0979398501", "0386896160"],
      phNumber: [{number: ""}]
    },
    // {mode:"onBlur"}
  });
  //register bao gồm 4 method name, onChange, onBlur, ref nên ta speard chúng

  countRender++;

  //dynamic form (add thêm input và xóa input => form động)
  const { fields, append,  } = useFieldArray({  
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "phNumber", // unique name for your Field Array -name phải giống như đã khai báo bên trên
  });
  console.log(`fields`, fields)

  console.log(`errors`, errors);

  function submitFunction(dataForm: IFormData) {
    console.log(`dataForm`, dataForm);
  }
  function addInputform() {
    //gán thêm input vào form (1 hoặc nhiều đều được) - sử dụng append trong useFieldArray
    append({   //ngoài append cũng hỗ trợ thêm remove input
        number: ""
    })
  }
  return (
    <div className="form_wrapper">
      <form
        action=""
        className="form_test"
        onSubmit={handleSubmit(submitFunction)}
      >
        <h2>React hooks form {countRender}</h2>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            onChange: (e) => console.log(11111, e.target.value),
            required: {
              value: true,
              message: "Username is required",
            },
            pattern: {
              value: /(?=.*[A-Z])/,
              message: "Phải có ít nhất 1 chữ in hoa trường username",
            },
          })}
        />
        {errors.username && (
          <div className="error">{errors.username.message}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            validate: (fieldValue) => {
              if (fieldValue === "trungphamk53@gmail.com") {
                return `Không được chọn email này, Vui lòng thử lại!`;
              }
              if (fieldValue.length < 15) {
                return "Email quá ngắn";
              }
            },
          })}
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
        <select
          placeholder="Channel"
          {...register("channel")}
          id="channel"
          aria-label="label for the select"
        >
          <option value={"channel1"}>Channel1</option>
          <option value={"channel2"}>Channel2</option>
          <option value={"channel3"}>Channel3</option>
          <option value={"channel4"}>Channel4</option>
        </select>
        <input
          type="text"
          placeholder="twiter"
          {...register("social.twiter")}
        />
        <input
          type="text"
          placeholder="facebook"
          {...register("social.facebook")}
        />

        <input
          type="text"
          placeholder="Số chính"
          {...register("phoneNumber.0")}
        />

        <input
          type="text"
          placeholder="Số phụ"
          {...register("phoneNumber.1")}
        />

        {/* form dynamic */}
        {fields.map((field, index) => {
            return <input
            key={field.id} // important to include key with field's id
            {...register(`phNumber.${index}.number`)}  //đặt tên cho từng input riêng biệt
            placeholder="dynamicForm"
          />
        })}
        <button onClick={addInputform} type="button">add Form</button>
        <button>Submit</button>
      </form>
      <DevTool control={control} />{" "}
      {/* set up the dev tool --thằng này nó sẽ xuất hiện bên phải màn hình
      bật lên để theo dõi change, tương tác từng trường các thứ, valuechange
      Touched: đã tương tác hay chưa, dirty là đã change hay chưa
      */}
    </div>
  );
};

export default Form_reactHookForm;
