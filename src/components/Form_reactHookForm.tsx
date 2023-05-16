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
  phNumber: { number: string }[];
  age: number;
  date: Date
}
let countRender = 0;
const Form_reactHookForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors,  isValid }, //lấy lỗi ở trong form ra để show   	
    // isValid: Set to true if the form doesn't have any errors.
    watch,getValues, setValue
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
      phNumber: [{ number: "" }],
      age: 0,
      date: new Date()
    },
    // {mode:"onBlur"}
  });
  //register bao gồm 4 method name, onChange, onBlur, ref nên ta speard chúng

  countRender++;

  //dynamic form (add thêm input và xóa input => form động)
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "phNumber", // unique name for your Field Array -name phải giống như đã khai báo bên trên
  });
  console.log(`fields`, fields);

  console.log(`errors`, errors);
  console.log(`isValid`, isValid);

  function submitFunction(dataForm: IFormData) {
    console.log(`dataForm`, dataForm);
  }
  function addInputform() {
    //gán thêm input vào form (1 hoặc nhiều đều được) - sử dụng append trong useFieldArray
    append({
      //ngoài append cũng hỗ trợ thêm remove input
      number: "",
    });
  }

  function getValueData() {
    console.log(`getValuesAll form`,getValues()) // lấy toàn bộ dữ liệu trong form
    console.log(`getValueinFieldusername`, getValues(`username`))
    console.log(`getValueinMultifield`, getValues([`username`, `password`]))
    
  }

  function setValueData() {
    setValue("username", "value_new")
  }
  //watch value form in ract hooks form same useWatch form antd
  const dataFormWatch = watch()  //không truyền tham số vào trong hàm watch, toàn bộ value form sẽ được theo dõi
  const watchmultifield = watch([`username`, `password`])
  const watchUsername = watch(`username`)
  return (
    <div className="form_wrapper">
      <form
        action=""
        className="form_test"
        onSubmit={handleSubmit(submitFunction)}
      >
        <h2>React hooks form {countRender}</h2>

        {/* data cho toàn bộ form */}
        <h5>data Form: {JSON.stringify(dataFormWatch)}</h5>  
        <h5>Watch Multifiled: {JSON.stringify(watchmultifield)}</h5>  
        <h5>Watch userNamefield: {JSON.stringify(watchUsername)}</h5>  

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
            validate: (fieldValue: string) => {
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

        <input
          type="number"
          placeholder="Age"
          {...register("age", {
            required: {
              value: true,
              message: "Age is required",
            },
            valueAsNumber: true, //dòng này để chỉ ra giá trị data trong form sẽ là number thay vì string, reactHookform tự convert
          })}
        />
        <input
          type="date"
          placeholder="Select date"
          {...register("date", {
            required: {
              value: true,
              message: "Date is required",
            },
            // valueAsDate: true, //dòng này để chỉ ra giá trị data trong form sẽ là date thay vì string, reactHookform tự convert
          })}
        />
        {/* form dynamic */}
        {fields.map((field: { number: string; id: number }, index: number) => {
          return (
            <input
              key={field.id} // important to include key with field's id
              {...register(`phNumber.${index}.number`)} //đặt tên cho từng input riêng biệt
              placeholder="dynamicForm"
            />
          );
        })}
        <div className="flex">
        <button onClick={addInputform} type="button">
          add Form
        </button>
        <button onClick={getValueData} type="button">
          GetValues
        </button>
        <button onClick={setValueData} type="button">
          setValueData
        </button>
        <button 
        // disabled = {!isValid}
        >Submit</button>
        </div>
       
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
