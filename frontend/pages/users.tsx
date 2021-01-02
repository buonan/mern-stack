import React, { Component, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useForm, useField, splitFormProps } from "react-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getAllUsers, createUser, deleteUserById, updateUserById } from "../src/api";

const api_host = process.env.API_HOST ?? 'localhost'
const api_port = process.env.API_PORT ?? '8080'

function validateField(value) {
  if (!value) {
    return "A value is required";
  }
  return false;
}

interface IInputFieldProps {
  field: string,
  validate: (value: string) => void,
}

const InputField = React.forwardRef((props: IInputFieldProps, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return (
    <>
      <TextField label={field} {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

function MyForm() {
  // Use the useForm hook to create a form instance
  const {
    Form,
    meta: { isSubmitting, canSubmit }
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      // await sendToFakeServer(values);
      await createUser(values)
    },
    debugForm: false
  });

  return (
    <Form>
      <div>
        <InputField field="Name" validate={validateField} />
      </div>
      <div>
        <InputField field="Password" validate={validateField} />
      </div>

      <div>
        <Button type="submit" variant="contained" disabled={!canSubmit}>
          Submit
        </Button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
}

function Item(user) {
  const [userState, setUser] = useState(user);

  return (
    <div>
      <input type='text' value={userState._id} />
      <input type='text' value={userState.Name} onChange={(e) => {
        e.preventDefault()
        console.log(`onchange!`)
        setUser({
          ...userState,
          Name: e.target.value,
        })
      }} />
      <Button {...userState} onClick={(e) => {
        e.preventDefault()
        console.log(`onClick! for ${userState._id}`)
        try {
          updateUserById(userState._id, userState)
        } catch (e) {
          console.log(`Error ${e}`)
        }
      }}>Update</Button>
      <Button {...userState} onClick={(e) => {
        e.preventDefault()
        console.log(`onClick! for ${userState._id}`)
        try {
          deleteUserById(userState._id)
        } catch (e) {
          console.log(`Error ${e}`)
        }
      }}>Delete</Button>
    </div>
  );
}

function UsersPage({ users }) {

  return (
    <div>
      Welcome users!
      <MyForm />
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            <Item {...user}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const users = await getAllUsers()
    return {
      props: {
        users
      }
    }
  } catch (e) {
    return {
      props: {
        users: null
      },
    }
  }
}

export default UsersPage