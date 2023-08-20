<script lang="ts">
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import {
		addColumnFilters,
		addExpandedRows,
		addGroupBy,
		addResizedColumns,
		addSortBy,
		textPrefixFilter
	} from 'svelte-headless-table/plugins';
	import TextFilter from '$lib/utilities/TextFilter.svelte';
	import type { IEvent } from '../types/IEvent';
	import SortImage from './charts/utils/SortImage.svelte';
	import { getDistinct, mean, latest } from './Tables/utils/utils';
	import ExpandIndicator from './Tables/utils/ExpandIndicator.svelte';
	import EventTitleLink from './Tables/utils/EventTitleLink.svelte';

	export let events: IEvent[];
	const eventStore = writable(events);
	const table = createTable(eventStore, {
		group: addGroupBy({ initialGroupByIds: ['eventType'] }),
		sort: addSortBy({
			toggleOrder: ['desc', 'asc'],
			initialSortKeys: [
				{
					id: 'averagePrice',
					order: 'desc'
				}
			]
		}),
		colFilter: addColumnFilters(),
		expand: addExpandedRows(),
		resize: addResizedColumns()
	});
	const columns = table.createColumns([
		table.display({
			id: 'expanded',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				const { isExpanded, canExpand, isAllSubRowsExpanded } =
					pluginStates.expand.getRowState(row);
				return createRender(ExpandIndicator, {
					depth: row.depth,
					isExpanded,
					canExpand,
					isAllSubRowsExpanded
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.group({
			header: 'Events Grouped by Type',
			columns: [
				table.column({
					header: 'Event Type',
					accessor: 'eventType',
					cell: ({ value }) => value.replaceAll('_', ' '),
					plugins: {
						colFilter: {
							fn: textPrefixFilter,
							render: ({ filterValue }) => createRender(TextFilter, { filterValue })
						}
					}
				}),
				table.column({
					header: 'Title',
					accessor: 'title',
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => getDistinct(values).length,
							cell: ({ value }) => `${value} unique`
						}
					}
				})
			]
		}),
		table.group({
			header: 'Details',
			plugins: {
				sort: {
					disable: true
				}
			},
			columns: [
				table.column({
					header: 'Link',
					accessor: 'eventId',
					cell: ({ value }) => createRender(EventTitleLink, { eventId: value }),
					plugins: {
						group: {
							disable: true
						}
					}
				}),
				table.column({
					header: 'Average Price',
					accessor: 'averagePrice',
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => mean(values),
							cell: ({ value }) => `${value.toFixed(2)} (avg)`
						}
					}
				}),
				table.column({
					header: 'Created',
					accessor: 'created_at',
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => latest(values),
							cell: ({ value }) => `Latest: ${value}`
						}
					}
				}),
				table.column({
					header: 'Announce Date',
					accessor: 'announceDate',
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => latest(values),
							cell: ({ value }) => `Latest: ${value}`
						}
					}
				}),
				table.column({
					header: 'Event Date',
					accessor: 'eventDate',
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => latest(values),
							cell: ({ value }) => `${value} is Latest`
						}
					}
				}),
				table.column({
					header: 'Event Popularity',
					accessor: 'eventPopularity',
					cell: ({ value }) => value.toFixed(3),
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => mean(values),
							cell: ({ value }) => `${value.toFixed(3)} (avg)`
						}
					}
				}),
				table.column({
					header: 'Event Score',
					accessor: 'eventScore',
					cell: ({ value }) => value.toFixed(3),
					plugins: {
						group: {
							disable: true,
							getAggregateValue: (values) => mean(values),
							cell: ({ value }) => `${value.toFixed(3)} (avg)`
						}
					}
				})
			]
		})
	]);
	const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
	//TODO change the search to an enum
</script>

<div class="relative rounded-xl overflow-auto border border-surface-600 w-fit">
	<div class="shadow-sm overflow-hidden card">
		<table {...$tableAttrs} class="border-collapse table-auto">
			<thead>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe
						rowAttrs={headerRow.attrs()}
						let:rowAttrs
						rowProps={headerRow.props()}
						let:rowProps
					>
						<tr {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<th
										{...attrs}
										on:click={props.sort.toggle}
										class="min-w-[100px] border-t border-l border-r first:border-l-0 last:border-r-0 border-surface-600 pt-2"
									>
										<Render of={cell.render()} />
										{#if !props.group.disabled}
											<button
												on:click={props.group.toggle}
												class="btn btn-sm variant-filled-surface"
											>
												{#if props.group.grouped}
													Ungroup
												{:else}
													Group
												{/if}
											</button>
										{/if}
										{#if !props.sort.disabled}
											<div class="flex justify-between p-2">
												{#if props.sort.order === 'asc'}
													<SortImage sortOrder={'asc'} />
												{:else if props.sort.order === 'desc'}
													<SortImage sortOrder={'desc'} />
												{:else if props.sort.order === 'none'}
													<SortImage sortOrder={'none'} />
												{/if}
												{#if props.colFilter?.render !== undefined}
													<div on:click|stopPropagation on:keypress|stopPropagation>
														<Render of={props.colFilter.render} />
													</div>
												{/if}
											</div>
										{/if}
									</th>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			</thead>
			<tbody {...$tableBodyAttrs}>
				{#each $rows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<tr
							{...rowAttrs}
							class="border-t border-b last:border-b-0 border-surface-600 hover:variant-soft-surface"
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<td
										{...attrs}
										class="p-2 border-b-0 border-l border-r first:border-l-0 last:border-r-0 border-surface-600 hover:variant-soft-surface"
									>
										<Render of={cell.render()} />
									</td>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			</tbody>
		</table>
	</div>
</div>
