import React from "react";
import { Button , Input , Form } from "antd";
import { useAddMoviesMutation } from "../store/slice/movieApi";
import MovieList from "./MovieList";


function AddMovies() {
  const [form] = Form.useForm();
  const [addMovies] = useAddMoviesMutation();

  const handleSubmit = async (values) => {
    try{
        await addMovies({title : values.title})
        form.resetFields();
    } catch(err) {
        console.log(err);
        
    }
  };

  return (
    <div>
      <h3>Add Movie</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Movie Name : "
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default AddMovies;
