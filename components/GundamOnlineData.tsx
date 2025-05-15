import React from 'react'
import { View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabase'

export function GundamOnlineData() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['GundamData'],
    queryFn: () =>
      supabase
        .from('GundamData')     // ← table name
        .select('*')            // ← no manual URL or headers needed
        .then(({ data, error }) => {
          if (error) throw error
          console.log('fetched rows:', data)
          return data
        }),
  })

  if (isLoading) return <Text>Loading…</Text>
  if (error)     return <Text>Error: {error.message}</Text>


  return (
    <View>
      {data.map(item => (
        <Text
          key={item.id.toString()}
          style={{ padding: 10, fontSize: 18, color: 'white' }}
        >
          {item.name} – {item.series}
        </Text>
      ))}
    </View>
  )
}

// Notes:
// Supabase table name: GundamData
// Supabase table RLS (Row level security) policy was disabled, otherwise the direct data would not be fetched
// How to do it without RLS disabled: IDK, probably create new policy or some shit
