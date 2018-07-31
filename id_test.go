package platform_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	"github.com/influxdata/platform"
	platformtesting "github.com/influxdata/platform/testing"
)

func TestIDFromString(t *testing.T) {
	tests := []struct {
		name    string
		id      string
		want    platform.ID
		wantErr bool
		err     string
	}{
		{
			name:    "Should be able to decode an all zeros ID",
			id:      "0000000000000000",
			wantErr: true,
			err:     "all 0s is not a valid ID",
		},
		{
			name: "Should be able to decode an all f ID",
			id:   "ffffffffffffffff",
			want: platformtesting.MustIDFromString("ffffffffffffffff"),
		},
		{
			name: "Should be able to decode an ID",
			id:   "020f755c3c082000",
			want: platformtesting.MustIDFromString("020f755c3c082000"),
		},
		{
			name:    "Should not be able to decode a non hex ID",
			id:      "gggggggggggggggg",
			wantErr: true,
			err:     "encoding/hex: invalid byte: U+0067 'g'",
		},
		{
			name:    "Should not be able to decode inputs with length other than 16 bytes",
			id:      "abc",
			wantErr: true,
			err:     fmt.Sprintf("input must be an array of %d bytes", platform.IDStringLength),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := platform.IDFromString(tt.id)

			// Check negative test cases
			if (err != nil) && tt.wantErr {
				if tt.err != err.Error() {
					t.Errorf("IDFromString() errors out \"%s\", want \"%s\"", err, tt.err)
				}
				return
			}

			// Check positive test cases
			if !reflect.DeepEqual(*got, tt.want) && !tt.wantErr {
				t.Errorf("IDFromString() outputs %v, want %v", got, tt.want)
			}
		})
	}
}

func TestDecodeFromString(t *testing.T) {
	var id platform.ID
	err := id.DecodeFromString("020f755c3c082000")
	if err != nil {
		t.Errorf(err.Error())
	}
	want := []byte{48, 50, 48, 102, 55, 53, 53, 99, 51, 99, 48, 56, 50, 48, 48, 48}
	got, _ := id.Encode()
	if !bytes.Equal(want, got) {
		t.Errorf("got ID not equal to wanted ID")
	}
	if id.String() != "020f755c3c082000" {
		t.Errorf("expecting string representation to contain the right value")
	}
	if !id.Valid() {
		t.Errorf("expecting ID to be a valid one")
	}
}

func TestEncode(t *testing.T) {
	var id platform.ID
	if _, err := id.Encode(); err == nil {
		t.Errorf("encoding an invalid ID should not be possible")
	}

	id.DecodeFromString("5ca1ab1eba5eba11")
	want := []byte{53, 99, 97, 49, 97, 98, 49, 101, 98, 97, 53, 101, 98, 97, 49, 49}
	got, _ := id.Encode()
	if !bytes.Equal(want, got) {
		t.Errorf("encoding error")
	}
	if id.String() != "5ca1ab1eba5eba11" {
		t.Errorf("expecting string representation to contain the right value")
	}
	if !id.Valid() {
		t.Errorf("expecting ID to be a valid one")
	}
}

func TestDecodeFromAllZeros(t *testing.T) {
	var id platform.ID
	err := id.Decode(make([]byte, platform.IDStringLength))
	if err == nil {
		t.Errorf("expecting all zeros ID to not be a valid ID")
	}
}

func TestDecodeFromShorterString(t *testing.T) {
	var id platform.ID
	err := id.DecodeFromString("020f75")
	if err == nil {
		t.Errorf("expecting shorter inputs to error")
	}
	if id.String() != "" {
		t.Errorf("expecting invalid ID to be serialized into empty string")
	}
}

func TestDecodeFromLongerString(t *testing.T) {
	var id platform.ID
	err := id.DecodeFromString("020f755c3c082000aaa")
	if err == nil {
		t.Errorf("expecting shorter inputs to error")
	}
	if id.String() != "" {
		t.Errorf("expecting invalid ID to be serialized into empty string")
	}
}

func TestDecodeFromEmptyString(t *testing.T) {
	var id platform.ID
	err := id.DecodeFromString("")
	if err == nil {
		t.Errorf("expecting empty inputs to error")
	}
	if id.String() != "" {
		t.Errorf("expecting invalid ID to be serialized into empty string")
	}
}

func TestMarshalling(t *testing.T) {
	var id0 platform.ID
	_, err := json.Marshal(id0)
	if err == nil {
		t.Errorf("expecting empty ID to not be a valid one")
	}

	init := "ca55e77eca55e77e"
	id1, err := platform.IDFromString(init)
	if err != nil {
		t.Errorf(err.Error())
	}

	serialized, err := json.Marshal(id1)
	if err != nil {
		t.Errorf(err.Error())
	}

	var id2 platform.ID
	json.Unmarshal(serialized, &id2)

	bytes1, _ := id1.Encode()
	bytes2, _ := id2.Encode()

	if !bytes.Equal(bytes1, bytes2) {
		t.Errorf("error marshalling/unmarshalling ID")
	}
}

func TestValid(t *testing.T) {
	var id platform.ID
	if id.Valid() {
		t.Errorf("expecting initial ID to be invalid")
	}
}
