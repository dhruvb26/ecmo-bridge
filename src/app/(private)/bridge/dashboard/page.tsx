"use client";

import React from "react";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/subframe/components/Button";
import { ToggleGroup } from "@/subframe/components/ToggleGroup";

import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { Table } from "@/subframe/components/Table";

function DashboardWithAnalyticsCopy() {
  return (
    <div className="bg-default-background container flex h-full w-full max-w-none flex-col items-start gap-8 pb-12 pt-12">
      <div className="flex w-full items-start gap-4">
        <IconWithBackground
          variant="success"
          size="medium"
          icon="FeatherCircle"
        />
        <div className="flex w-full shrink-0 grow basis-0 flex-col items-start gap-1">
          <span className="text-heading-2 font-heading-2 text-default-font">
            Deployment Status
          </span>
          <div className="flex items-start gap-6">
            <div className="flex items-center gap-1">
              <SubframeCore.Icon
                className="text-body font-body text-subtext-color"
                name="FeatherGauge"
              />
              <div className="flex flex-col items-start">
                <span className="text-body font-body text-subtext-color">
                  Service uptime
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <SubframeCore.Icon
                className="text-body font-body text-subtext-color"
                name="FeatherClock"
              />
              <span className="text-body font-body text-subtext-color">
                Checked every 2 minutes
              </span>
            </div>
            <div className="flex items-center gap-1">
              <SubframeCore.Icon
                className="text-body font-body text-subtext-color"
                name="FeatherAlertTriangle"
              />
              <div className="flex flex-col items-start">
                <span className="text-body font-body text-subtext-color">
                  No errors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-start gap-2">
        <Button variant="neutral-secondary" size="medium" icon="FeatherSend">
          Send alert
        </Button>
        <Button
          variant="neutral-secondary"
          size="medium"
          icon="FeatherAlertTriangle"
        >
          View errors
        </Button>
        <Button
          variant="neutral-secondary"
          size="medium"
          icon="FeatherPauseCircle"
        >
          Pause deployment
        </Button>
        <Button
          variant="neutral-secondary"
          size="medium"
          icon="FeatherSettings"
        >
          Configure
        </Button>
      </div>
      <div className="flex w-full items-start gap-2">
        <div className="border-neutral-border bg-default-background shadow-default flex w-full min-w-[160px] shrink-0 grow basis-0 flex-col items-start gap-1 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
          <span className="text-body font-body line-clamp-1 w-full text-neutral-600">
            Current uptime
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font w-full">
            4 hours 20 mins
          </span>
        </div>
        <div className="border-neutral-border bg-default-background shadow-default flex w-full min-w-[160px] shrink-0 grow basis-0 flex-col items-start gap-1 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
          <span className="text-body font-body line-clamp-1 w-full text-neutral-600">
            Last checked
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font w-full">
            48 seconds ago
          </span>
        </div>
        <div className="border-neutral-border bg-default-background shadow-default flex w-full min-w-[160px] shrink-0 grow basis-0 flex-col items-start gap-1 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
          <span className="text-body font-body line-clamp-1 w-full text-neutral-600">
            Errors
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font w-full">
            0
          </span>
        </div>
      </div>
      <div className="border-neutral-border bg-default-background shadow-default flex w-full flex-col items-start gap-8 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
        <div className="flex w-full items-center gap-2">
          <span className="text-heading-3 font-heading-3 text-default-font w-full shrink-0 grow basis-0">
            Uptime
          </span>
          <ToggleGroup>
            <ToggleGroup.Item icon={null} value="64f5af7c">
              24h
            </ToggleGroup.Item>
            <ToggleGroup.Item icon={null} value="76101f06">
              7d
            </ToggleGroup.Item>
            <ToggleGroup.Item icon={null} value="404920ed">
              1mo
            </ToggleGroup.Item>
          </ToggleGroup>
        </div>
      </div>
      <div className="border-neutral-border bg-default-background shadow-default flex w-full flex-col items-start gap-8 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
        <div className="flex w-full items-center gap-2">
          <span className="text-heading-3 font-heading-3 text-default-font w-full shrink-0 grow basis-0">
            Incident response times
          </span>
          <ToggleGroup>
            <ToggleGroup.Item icon={null} value="ee20cbbb">
              24h
            </ToggleGroup.Item>
            <ToggleGroup.Item icon={null} value="69576307">
              7d
            </ToggleGroup.Item>
            <ToggleGroup.Item icon={null} value="dc62b1b9">
              1mo
            </ToggleGroup.Item>
          </ToggleGroup>
        </div>
      </div>
      <div className="border-neutral-border bg-default-background shadow-default flex w-full flex-col items-start gap-6 rounded border border-solid pb-6 pl-6 pr-6 pt-6">
        <div className="flex w-full items-center gap-2">
          <span className="text-heading-3 font-heading-3 text-default-font w-full shrink-0 grow basis-0">
            Downtime
          </span>
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <Button
                variant="neutral-secondary"
                size="large"
                icon={null}
                iconRight="FeatherChevronDown"
              >
                Group by
              </Button>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="end"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon={null}>
                    Time Period
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Server
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Incidents
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Time period</Table.HeaderCell>
              <Table.HeaderCell>Availability</Table.HeaderCell>
              <Table.HeaderCell>Downtime</Table.HeaderCell>
              <Table.HeaderCell>Incidents</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          <Table.Row>
            <Table.Cell>
              <span className="text-body-bold font-body-bold text-neutral-700">
                Last 24 hours
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                100.00%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                0 seconds
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">0</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="text-body-bold font-body-bold text-neutral-700">
                Last 7 days
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                99.99%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                1 min 10 seconds
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">1</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="text-body-bold font-body-bold text-neutral-700">
                Last 30 days
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                99.95%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                2 mins 30 seconds
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">3</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="text-body-bold font-body-bold text-neutral-700">
                Last 365 days
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                99.94%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">
                4 mins 20 seconds
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-body font-body text-neutral-500">12</span>
            </Table.Cell>
          </Table.Row>
        </Table>
      </div>
    </div>
  );
}

export default DashboardWithAnalyticsCopy;
