'use strict';

const AError = require('./../AzuriteError'),
    N = require('./../model/HttpHeaderNames'),
    ErrorCodes = require('./../ErrorCodes'),
    isUUID = require('validator/lib/isUUID');

/**
 * Checks whether leaseId complies to RFC4122 (UUID) version 3-5.
 * 
 * @class LeaseId
 */
class LeaseId {
    constructor() {
    }

    validate({ request = undefined }) {
        const leaseId = request.httpProps[N.LEASE_ID],
            proposedLeaseId = request.httpProps[N.PROPOSED_LEASE_ID];

        if (leaseId && !isUUID(leaseId, 'all')) {
            throw new AError(ErrorCodes.InvalidHeaderValue);
        }
        if (proposedLeaseId && !isUUID(proposedLeaseId, 'all')) {
            throw new AError(ErrorCodes.InvalidHeaderValue);
        }
    }
}

module.exports = new LeaseId();