#include "Algorithm.h"


// todo: refactor
// now doubles the array

/** Processing matrix
 *
 * @param old_matrix
 * @return
 */
vector<vector<int>> Algorithm::process(vector<vector<int>> old_matrix) {
    vector<vector<int>> matrix;
    for (const vector<int> &old_v: old_matrix) {
        vector<int> v;
        for (int i: old_v) {
            v.push_back(i * 2);
        }
        matrix.push_back(v);
    }
    return matrix;
}


/**
**   todo: add more functions
**/