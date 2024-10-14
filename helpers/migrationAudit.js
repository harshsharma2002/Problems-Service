const addAuditTrails = (table) => {
    table.uuid('createdBy').nullable().index()
    table.uuid('updatedBy').nullable().index()

    table.timestamps(true, true)

    table.index('createdAt')
    table.index('updatedAt')
}

module.exports = { addAuditTrails }