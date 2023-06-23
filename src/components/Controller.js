import "./styles.css";
import { Controller, useForm } from 'react-hook-form';

export default function App() {
  const { control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      testinput: ""  //phải add defaultvalue không thì có thể sẽ dẫn đến lỗi
    }
  });

  const submitFn = (data) => {
    //được log ra khi lỗi không tồn tại trong errors
    console.log(`data`, data)
  };
  console.log("err", errors);  //khi có lỗi sẽ được in ở đây
  return (
    <div className="App">
  
        <Controller
          name="testinput"
          control={control}
      
          rules={{ 
            required: 'This field is required.',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Only letters are allowed.'
            }
           }}
          render={({ field }) => (
            <input {...field}    
          />
          )}
        />
        <button onClick = {handleSubmit(submitFn)}>Submit</button>
    </div>
  );
}
