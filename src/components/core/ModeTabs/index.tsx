import * as Tabs from '@radix-ui/react-tabs'
import type { FC } from 'react'
import React from 'react'

interface Props {
  totalGraph: React.ReactNode
  juniorsGraph: React.ReactNode
  workingGraph: React.ReactNode
  oldGraph: React.ReactNode
}

export const ModeTabs: FC<Props> = ({ totalGraph, juniorsGraph, workingGraph, oldGraph }) => {
  return (
    <form>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="total">全体</Tabs.Trigger>
          <Tabs.Trigger value="juniors">年少人口</Tabs.Trigger>
          <Tabs.Trigger value="working">生産年齢人口</Tabs.Trigger>
          <Tabs.Trigger value="old">老年人口</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="total">{totalGraph}</Tabs.Content>
        <Tabs.Content value="juniors">{juniorsGraph}</Tabs.Content>
        <Tabs.Content value="working">{workingGraph}</Tabs.Content>
        <Tabs.Content value="old">{oldGraph}</Tabs.Content>
      </Tabs.Root>
    </form>
  )
}
