import * as Tabs from '@radix-ui/react-tabs'
import type { FC } from 'react'
import React from 'react'
import { css } from '@kuma-ui/core'
import { TabsTrigger } from './Trigger'

interface Props {
  totalGraph: React.ReactNode
  juniorsGraph: React.ReactNode
  workingGraph: React.ReactNode
  oldGraph: React.ReactNode
}

export const ModeTabs: FC<Props> = ({
  totalGraph,
  juniorsGraph,
  workingGraph,
  oldGraph,
}) => {
  return (
    <form>
      <Tabs.Root defaultValue="total">
        <Tabs.List
          className={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            padding: 8px;
            border-radius: 8px;
            background-color: t("colors.primary");
            margin-bottom: 16px;
          `}
        >
          <TabsTrigger value="total">全体</TabsTrigger>
          <TabsTrigger value="juniors">年少人口</TabsTrigger>
          <TabsTrigger value="working">生産年齢人口</TabsTrigger>
          <TabsTrigger value="old">老年人口</TabsTrigger>
        </Tabs.List>
        <Tabs.Content value="total">{totalGraph}</Tabs.Content>
        <Tabs.Content value="juniors">{juniorsGraph}</Tabs.Content>
        <Tabs.Content value="working">{workingGraph}</Tabs.Content>
        <Tabs.Content value="old">{oldGraph}</Tabs.Content>
      </Tabs.Root>
    </form>
  )
}
