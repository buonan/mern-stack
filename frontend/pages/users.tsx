import React, { Component } from 'react';
import { GetServerSideProps } from 'next'
import fetch from "isomorphic-fetch";
const api_host = process.env.API_HOST ?? 'localhost'
const api_port = process.env.API_PORT ?? '8080'

function UsersPage({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <a>{user.name}</a>
        </li>
      ))}
    </ul>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const res = await fetch(`http://${api_host}:${api_port}/users`)
    const users = await res.json()
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