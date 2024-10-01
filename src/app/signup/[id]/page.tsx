"use client"
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'

const Info = ({ props }: any) => {

    return (
        <div>
            <p>
                A confirmation mail has been sent to {}.
            </p>
        </div>
    )
}

export default Info