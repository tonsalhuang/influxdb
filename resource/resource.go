// Package resource defines an interface for recording changes to InfluxDB resources.
//
// A resource is an entity in our system, e.g. an organization, task or bucket.
// A change includes the creation, update or deletion of a resource.
package resource

import (
	"time"

	"github.com/influxdata/influxdb"
)

// Logger records changes to resources.
type Logger interface {
	// Log a change to a resource.
	Log(Change) error
}

// Change to a resource.
type Change struct {
	// Type of change.
	Type ChangeType
	// ResourceID of the changed resource.
	ResourceID string
	// ResourceType that was changed.
	ResourceType influxdb.ResourceType
	// OrganizationID of the organization owning the changed resource.
	OrganizationID string
	// ResourceBody after the change.
	ResourceBody []byte
	// Time when the change was completed.
	Time time.Time
}

// Type of  change.
type ChangeType string

const (
	// Create a resource.
	Create ChangeType = "create"
	// Update a resource.
	Update = "update"
	// Delete a resource
	Delete = "delete"
)
