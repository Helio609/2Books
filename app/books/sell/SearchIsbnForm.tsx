'use client'

import { searchBookByIsbnAction } from '@/lib/actions/SearchBookByIsbnAction'
import { CameraIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { BarcodeDetector, DetectedBarcode } from 'barcode-detector/pure'
import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

export default function SearchIsbnForm({ defaultValue }: { defaultValue?: string }) {
  const [imageSrc, setImageSrc] = useState('')
  const [isbn, setIsbn] = useState('')

  const [scan, setScan] = useState(false)

  // Init webcam and capture function
  const webcamRef = useRef<Webcam | null>(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setImageSrc(imageSrc)
    }
  }, [webcamRef])

  useEffect(() => {
    const image = new Image()
    image.src = imageSrc

    const barcodeDetector = new BarcodeDetector({
      formats: ['ean_13'],
    })
    barcodeDetector.detect(image).then((value: DetectedBarcode[]) => {
      if (value.at(0)?.rawValue) {
        setIsbn(value.at(0)?.rawValue ?? '')
        setScan(false)
      }
    })
  }, [imageSrc])

  useEffect(() => {
    if (!scan) {
      return
    }

    const interval = setInterval(() => capture(), 1000)
    return () => clearInterval(interval)
  }, [scan, capture])

  return (
    <>
      <form
        action={searchBookByIsbnAction}
        className='p-2 flex items-center justify-center space-x-2 rounded-lg border-2 border-black border-dashed'
      >
        ISBN:{' '}
        <input
          name='isbn'
          defaultValue={defaultValue ?? isbn}
          type='text'
          required
          className='w-32 outline-none border-b-2 border-black border-dashed'
        />
        <button
          onClick={() => setScan(!scan)}
          type='button'
          className='p-1 rounded-full border-2 border-black border-dashed'
        >
          <CameraIcon className='w-5 h-5' />
        </button>
        <button type='submit' className='p-1 rounded-full border-2 border-black border-dashed'>
          <MagnifyingGlassIcon className='w-5 h-5' />
        </button>
      </form>
      {scan && (
        <>
          <Webcam
            className='self-center mt-10'
            ref={webcamRef}
            audio={false}
            width={200}
            screenshotFormat='image/jpeg'
            videoConstraints={{ facingMode: 'environment' }}
          />
          <p className='text-center text-sm'>ISBN: {isbn.length == 0 ? 'Detecting...' : isbn}</p>
        </>
      )}
    </>
  )
}
