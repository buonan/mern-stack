
import React, { Component } from 'react';
import { GetServerSideProps } from 'next'
import fetch from "isomorphic-fetch";
const api_host = process.env.API_HOST ?? 'localhost'
const api_port = process.env.API_PORT ?? '8080'

function HealthPage({ health }) {
  let status = `Api is ${health.ok}, Mongo is ${health.mongo}`
  return (
    <div>{status}</div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const res = await fetch(`http://${api_host}:${api_port}/health`)
    const health = await res.json()
    return {
      props: {
        health: {
          ok: health.ok == true ? 'good' : 'bad',
          mongo: health.mongo == true ? 'good' : 'bad'
        },
      },
    }
  } catch (e) {
    return {
      props: {
        health: {
          ok: JSON.stringify(e.message)
        },
      },
    }
  }
}

export default HealthPage